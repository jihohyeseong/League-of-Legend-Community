package com.example.soccerCommunity.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private String username;
    private String name;
    private String role;



    public static UserDto createDto(String username, OAuth2Response oAuth2Response) {

        return new UserDto(
                username,
                oAuth2Response.getName(),
                "ROLE_USER"
        );
    }
}
