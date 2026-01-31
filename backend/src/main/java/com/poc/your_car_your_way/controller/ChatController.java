package com.poc.your_car_your_way.controller;

import com.poc.your_car_your_way.model.ChatBox;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.UUID;

@Controller
public class ChatController {

    /**
     * Managing messages sent in a chat room
     *
     * @param roomId
     * @param chatBox
     * @return
     */
    @MessageMapping("/chat/{roomId}/sendMessage")
    @SendTo("/topic/chat/{roomId}")
    public ChatBox sendMessage(@DestinationVariable String roomId,
                               @Payload ChatBox chatBox) {
        chatBox.setChatbox_id(UUID.randomUUID().toString());
        chatBox.setChatRoomId(roomId);
        chatBox.setTimestamp(LocalDateTime.now());
        chatBox.setType(ChatBox.MessageType.CHAT);
        return chatBox;
    }


    /**
     * Managing a user's arrival in a room
     *
     * @param roomId
     * @param chatBox
     * @param headerAccessor
     * @return
     */
    @MessageMapping("/chat/{roomId}/addUser")
    @SendTo("/topic/chat/{roomId}")
    public ChatBox addUser(@DestinationVariable String roomId,
                           @Payload ChatBox chatBox,
                           SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", chatBox.getSenderName());
        headerAccessor.getSessionAttributes().put("roomId", roomId);

        chatBox.setChatbox_id(UUID.randomUUID().toString());
        chatBox.setChatRoomId(roomId);
        chatBox.setTimestamp(LocalDateTime.now());
        chatBox.setType(ChatBox.MessageType.JOIN);
        chatBox.setContent(chatBox.getSenderName() + " joined the chat");

        return chatBox;
    }


    /**
     * Managing the closure of a chat
     *
     * @param roomId
     * @param chatBox
     * @return
     */
    @MessageMapping("/chat/{roomId}/closeChat")
    @SendTo("/topic/chat/{roomId}")
    public ChatBox closeChat(@DestinationVariable String roomId,
                             @Payload ChatBox chatBox) {
        chatBox.setChatbox_id(UUID.randomUUID().toString());
        chatBox.setChatRoomId(roomId);
        chatBox.setTimestamp(LocalDateTime.now());
        chatBox.setType(ChatBox.MessageType.CLOSE);
        chatBox.setContent("The chat has been closed by " + chatBox.getSenderName() + ". Issue Resolved");

        return chatBox;
    }
}
