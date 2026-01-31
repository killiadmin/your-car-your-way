package com.poc.your_car_your_way.listener;

import com.poc.your_car_your_way.model.ChatBox;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.time.LocalDateTime;
import java.util.UUID;

@Component
@Slf4j
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messagingTemplate;

    /**
     *
     * @param messagingTemplate
     */
    public WebSocketEventListener(SimpMessageSendingOperations messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    /**
     *
     * @param event
     */
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");

        if (username != null && roomId != null) {
            ChatBox chatBox = new ChatBox();
            chatBox.setChatbox_id(UUID.randomUUID().toString());
            chatBox.setChatRoomId(roomId);
            chatBox.setType(ChatBox.MessageType.LEAVE);
            chatBox.setSenderName(username);
            chatBox.setContent(username + " left the chat");
            chatBox.setTimestamp(LocalDateTime.now());

            messagingTemplate.convertAndSend("/topic/chat/" + roomId, chatBox);
        }
    }
}
