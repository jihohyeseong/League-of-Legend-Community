package com.example.soccerCommunity.entity;

import com.example.soccerCommunity.dto.CommentDto;
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
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "community_id", referencedColumnName = "id", nullable = false)
    private Community community;

    private String communityTitle;

    private String nickname;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String content;

    private LocalDateTime createdAt; // 생성일자

    private LocalDateTime updatedAt; // 수정일자

    private Long likesCount; // 좋아요 수

    private Long hatesCount; // 싫어요 수

    public static Comment toEntity(String nickname, Community community, CommentDto commentDto) {

        return new Comment(
                null,
                community,
                community.getTitle(),
                nickname,
                commentDto.getContent(),
                LocalDateTime.now(),
                LocalDateTime.now(),
                0L,
                0L
        );
    }

    public void patch(String nickname, CommentDto commentDto) {

        this.nickname = nickname;
        this.content = commentDto.getContent();
        this.updatedAt = LocalDateTime.now();
    }
}
