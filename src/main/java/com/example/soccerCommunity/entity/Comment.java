package com.example.soccerCommunity.entity;

import com.example.soccerCommunity.dto.CommentDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
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

    // 부모 댓글 참조 (대댓글 기능 추가)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Comment parent;

    // 자식 댓글 리스트 (부모 댓글이 삭제되어도 자식 댓글 유지)
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Comment> children = new ArrayList<>();

    // 일반 댓글
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
                0L,
                null,
                new ArrayList<>()
        );
    }

    // 대댓글
    public static Comment toReplyEntity(String nickname, Community community, CommentDto commentDto, Comment parent) {
        Comment reply = new Comment(
                null,
                community,
                community.getTitle(),
                nickname,
                commentDto.getContent(),
                LocalDateTime.now(),
                LocalDateTime.now(),
                0L,
                0L,
                parent, // 부모 설정
                new ArrayList<>()
        );
        parent.children.add(reply); // 부모 댓글에 대댓글 추가
        return reply;
    }
    public void patch(String nickname, CommentDto commentDto) {

        this.nickname = nickname;
        this.content = commentDto.getContent();
        this.updatedAt = LocalDateTime.now();
    }
}
