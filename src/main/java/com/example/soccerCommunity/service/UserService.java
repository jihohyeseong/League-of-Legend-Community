package com.example.soccerCommunity.service;

import com.example.soccerCommunity.dto.CustomOAuth2User;
import com.example.soccerCommunity.dto.UserDto;
import com.example.soccerCommunity.dto.UserInfoDto;
import com.example.soccerCommunity.entity.User;
import com.example.soccerCommunity.entity.UserInfo;
import com.example.soccerCommunity.repository.UserInfoRepository;
import com.example.soccerCommunity.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;

    public UserService(UserRepository userRepository, UserInfoRepository userInfoRepository){

        this.userRepository = userRepository;
        this.userInfoRepository = userInfoRepository;
    }


    public UserDto myInfo(String username) {

        User user = userRepository.findByUsername(username);

        return UserDto.toDto(user);
    }

    public UserInfoDto detailInfo(String username) {

        UserInfo userInfo = userInfoRepository.findByUser_Username(username);

        return UserInfo.toDto(userInfo);
    }

    @Transactional
    public UserInfoDto setDetailInfo(String username, UserInfoDto userInfoDto) {

        User user = userRepository.findByUsername(username);
        UserInfo userInfo = UserInfoDto.toEntity(user, userInfoDto);

        UserInfo created = userInfoRepository.save(userInfo);

        return UserInfo.toDto(created);
    }

    public boolean checkNickname(String nickname) {

        return !userInfoRepository.existsByNickname(nickname);
    }
}
