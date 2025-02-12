package com.example.soccerCommunity.service;

import com.example.soccerCommunity.dto.MessageRequestDto;
import com.example.soccerCommunity.dto.MessageResponseDto;
import com.example.soccerCommunity.entity.UserInfo;
import com.example.soccerCommunity.repository.UserInfoRepository;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    private final UserInfoRepository userInfoRepository;

    public MessageService(UserInfoRepository userInfoRepository){

        this.userInfoRepository = userInfoRepository;
    }

    public MessageResponseDto processMessage(String username, MessageRequestDto requestDto) {

        UserInfo userInfo = userInfoRepository.findByUser_Username(username);
        String nickname = userInfo.getNickname();

        return new MessageResponseDto(nickname, requestDto.getContent());
    }
}
