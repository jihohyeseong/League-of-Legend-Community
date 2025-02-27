package com.example.soccerCommunity.controller;

import com.example.soccerCommunity.dto.MessageRequestDto;
import com.example.soccerCommunity.dto.MessageResponseDto;
import com.example.soccerCommunity.service.MessageService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService){

        this.messageService = messageService;
    }

    @MessageMapping("/chat")
    @SendTo("/topic/chat")
    public MessageResponseDto sendChatMessage(MessageRequestDto requestDto) {

        return messageService.processMessage(requestDto);
    }
}
