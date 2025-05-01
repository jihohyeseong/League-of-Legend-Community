package com.example.soccerCommunity.dto;

import com.example.soccerCommunity.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {

    private Long id;
    private Long communityId;
    private String nickname;
    private String imageUrl;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long likesCount;
    private Long parentId; // 트리 구성에 필요
    private List<CommentDto> children = new ArrayList<>();

    public static CommentDto toDto(Comment c) {
        return new CommentDto(
                c.getId(),
                c.getCommunity().getId(),
                c.getNickname(),
                c.getUserInfo().getImageUrl(),
                c.getContent(),
                c.getCreatedAt(),
                c.getUpdatedAt(),
                c.getLikesCount(),
                c.getParent() != null ? c.getParent().getId() : null,
                new ArrayList<>()
        );
    }
}
