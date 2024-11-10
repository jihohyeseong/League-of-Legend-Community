package com.example.soccerCommunity.entity;

import com.example.soccerCommunity.dto.UserInfoDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "username", referencedColumnName = "username", nullable = false)
    private User user;

    @Column(unique = true)
    private String nickname;

    private Long point; // 승부예측, 게임등으로 얻는 포인트

    private Long exp; // 출석체크, 추천을 통해 얻은 경험치

    private Long level; // 경험치를 통해 레벨업

    private String imageUrl; // 마이 팀 이미지로고

    public static UserInfoDto toDto(UserInfo created) {

        return new UserInfoDto(
                created.getId(),
                created.getUser().getUsername(),
                created.getNickname(),
                created.getPoint(),
                created.getExp(),
                created.getLevel(),
                created.getImageUrl()
        );
    }
}
