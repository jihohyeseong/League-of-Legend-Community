package com.example.soccerCommunity.service;

import com.example.soccerCommunity.dto.MessageRequestDto;
import com.example.soccerCommunity.dto.MessageResponseDto;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    public MessageResponseDto processMessage(MessageRequestDto requestDto) {

        return new MessageResponseDto(requestDto.getNickname(), requestDto.getContent(), requestDto.getCreatedAt());
    }
}
