package com.example.soccerCommunity.dto;

import com.example.soccerCommunity.entity.User;
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
    private String email;
    private String role;



    public static UserDto createDto(String username, OAuth2Response oAuth2Response) {

        return new UserDto(
                username,
                oAuth2Response.getName(),
                oAuth2Response.getEmail(),
                "ROLE_USER"
        );
    }

    public static UserDto toDto(User user) {

        return new UserDto(
                user.getUsername(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}
