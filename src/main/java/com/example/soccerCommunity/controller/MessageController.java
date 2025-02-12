package com.example.soccerCommunity.controller;

import com.example.soccerCommunity.dto.CustomOAuth2User;
import com.example.soccerCommunity.dto.MessageRequestDto;
import com.example.soccerCommunity.dto.MessageResponseDto;
import com.example.soccerCommunity.service.MessageService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService){

        this.messageService = messageService;
    }

    @MessageMapping("/chat")
    @SendTo("/topic/chat")
    public MessageResponseDto sendChatMessage(@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
                                              MessageRequestDto requestDto) {

        String username = customOAuth2User.getUsername();

        return messageService.processMessage(username, requestDto);
    }
}
