package com.example.soccerCommunity.controller;

import com.example.soccerCommunity.dto.CustomOAuth2User;
import com.example.soccerCommunity.entity.User;
import com.example.soccerCommunity.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    private final UserService userService;

    public MyController(UserService userService){

        this.userService = userService;
    }

    @GetMapping("/my")
    public String myAPI(){

        return "my route";
    }

    @GetMapping("/mypage")
    public User mypage(@AuthenticationPrincipal CustomOAuth2User customOAuth2User){

        String username = customOAuth2User.getUsername();
        User user = userService.myInfo(username);

        return user;
    }
}
