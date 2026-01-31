package com.poc.your_car_your_way.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatBox {

    private String chatbox_id;
    private String chatRoomId;
    private String senderId;
    private String senderName;
    private String content;
    private MessageType type;
    private LocalDateTime timestamp;

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE,
        CLOSE
    }
}
