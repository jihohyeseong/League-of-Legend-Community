package com.example.soccerCommunity.dto;

import com.example.soccerCommunity.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {

    private Long id;
    private Long communityId;
    private String communityTitle;
    private String nickname;
    private String content;
    private LocalDateTime createdAt; // 생성일자
    private LocalDateTime updatedAt; // 수정일자
    private Long likesCount; // 좋아요 수
    private Long hatesCount; // 싫어요 수

    public static CommentDto toDto(Comment comment) {

        return new CommentDto(
                comment.getId(),
                comment.getCommunity().getId(),
                comment.getCommunityTitle(),
                comment.getNickname(),
                comment.getContent(),
                comment.getCreatedAt(),
                comment.getUpdatedAt(),
                comment.getLikesCount(),
                comment.getHatesCount()
        );
    }
}
