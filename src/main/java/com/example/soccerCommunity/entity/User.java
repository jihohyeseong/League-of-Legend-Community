package com.example.soccerCommunity.entity;

import com.example.soccerCommunity.dto.OAuth2Response;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String name;

    private String email;

    private String role;

    public static User createUser(String username, OAuth2Response response) {

        return new User(
                null,
                username,
                response.getName(),
                response.getEmail(),
                "ROLE_USER"
        );
    }
}
