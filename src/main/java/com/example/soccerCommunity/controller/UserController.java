package com.example.soccerCommunity.controller;

import com.example.soccerCommunity.dto.CustomOAuth2User;
import com.example.soccerCommunity.dto.UserDto;
import com.example.soccerCommunity.dto.UserInfoDto;
import com.example.soccerCommunity.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){

        this.userService = userService;
    }


    @GetMapping("/mypage")
    public ResponseEntity<UserDto> mypage(@AuthenticationPrincipal CustomOAuth2User customOAuth2User){

        String username = customOAuth2User.getUsername();
        UserDto dto = userService.myInfo(username);

        return (dto != null) ?
                ResponseEntity.status(HttpStatus.OK).body(dto) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/info")
    public ResponseEntity<UserInfoDto> myInfo(@AuthenticationPrincipal CustomOAuth2User customOAuth2User){

        String username = customOAuth2User.getUsername();
        UserInfoDto dto = userService.detailInfo(username);

        return (dto != null) ?
                ResponseEntity.status(HttpStatus.OK).body(dto) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping("/info")
    public ResponseEntity<UserInfoDto> setInfo(@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
                                               @RequestBody UserInfoDto userInfoDto){

        String username = customOAuth2User.getUsername();
        UserInfoDto dto = userService.setDetailInfo(username, userInfoDto);

        return (dto != null) ?
                ResponseEntity.status(HttpStatus.CREATED).body(dto) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/check/{nickname}")
    public ResponseEntity<Map<String, Object>> checkNickname(@PathVariable String nickname){

        Map<String, Object> response = new HashMap<>();

        boolean isAvailable = userService.checkNickname(nickname);
        response.put("available", isAvailable);

        if (isAvailable) {
            response.put("message", "사용 가능한 닉네임입니다.");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            response.put("message", "이미 사용중인 닉네임입니다.");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }
}
