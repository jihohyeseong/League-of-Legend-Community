package com.example.soccerCommunity.dto;

import com.example.soccerCommunity.entity.User;
import com.example.soccerCommunity.entity.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDto {

    private Long id;
    private String username;
    private String nickname;
    private Long point; // 승부예측, 게임등으로 얻는 포인트
    private Long exp; // 출석체크, 추천을 통해 얻은 경험치
    private Long level; // 경험치를 통해 레벨업
    private String imageUrl; // 마이 팀 이미지로고

    public static UserInfo toEntity(User user, UserInfoDto userInfoDto) {

        return new UserInfo(
                null,
                user,
                userInfoDto.getNickname(),
                1000L,
                0L,
                1L,
                userInfoDto.getImageUrl()
        );
    }
}
