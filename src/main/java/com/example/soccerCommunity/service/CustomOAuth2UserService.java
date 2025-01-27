package com.example.soccerCommunity.service;

import com.example.soccerCommunity.dto.*;
import com.example.soccerCommunity.entity.User;
import com.example.soccerCommunity.repository.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository){

        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException{

        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println(oAuth2User);

        String registrationId = userRequest.getClientRegistration().getRegistrationId(); // naver, google etc..
        OAuth2Response oAuth2Response = null;

        if(registrationId.equals("naver")){

            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        }
        else if(registrationId.equals("google")){

            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        }
        else if(registrationId.equals("kakao")){

            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());
        }
        else return null;

        String username = oAuth2Response.getProvider()+" "+oAuth2Response.getProviderId();

        User user = userRepository.findByUsername(username);

        if(user == null){

            User newUser = User.createUser(username, oAuth2Response);
            userRepository.save(newUser);
            UserDto userDto = UserDto.createDto(username, oAuth2Response);

            return new CustomOAuth2User(userDto);
        }
        else{

            UserDto userDto = UserDto.createDto(username, oAuth2Response);

            return new CustomOAuth2User(userDto);
        }
    }
}
