package com.example.soccerCommunity.dto;

import com.example.soccerCommunity.entity.Community;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommunityDto {

    private Long id;
    private String nickname;
    private String title;
    private String content;
    private LocalDateTime createdAt; // 생성일자
    private LocalDateTime updatedAt; // 수정일자
    private Long viewsCount; // 조회수
    private Long likesCount; // 좋아요 수
    private Long commentsCount; // 댓글 수

    public static Community toEntity(String nickname, CommunityDto communityDto) {

        return new Community(
                null,
                nickname,
                communityDto.getTitle(),
                communityDto.getContent(),
                LocalDateTime.now(),
                LocalDateTime.now(),
                0L,
                0L,
                0L,
                null
        );
    }
}
