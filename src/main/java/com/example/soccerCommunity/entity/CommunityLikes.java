package com.example.soccerCommunity.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommunityLikes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "community_id", referencedColumnName = "id", nullable = false)
    private Community community;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    private String nickname;

    private LocalDateTime createdAt;

    public static CommunityLikes create(User user, Community community, String nickname) {

        return new CommunityLikes(
                null,
                community,
                user,
                nickname,
                LocalDateTime.now()
        );
    }
}
