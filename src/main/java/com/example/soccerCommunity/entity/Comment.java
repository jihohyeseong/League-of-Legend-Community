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

    // 부모 댓글 참조 (대댓글 기능 추가)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Comment parent;

    // 자식 댓글 리스트 (부모 댓글이 삭제되어도 자식 댓글 유지)
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Comment> children = new ArrayList<>();

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommentLikes> likes = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_info_id", referencedColumnName = "id")
    private UserInfo userInfo;

    // 일반 댓글
    public static Comment toEntity(UserInfo userInfo, Community community, CommentDto commentDto) {

        return new Comment(
                null,
                community,
                community.getTitle(),
                userInfo.getNickname(),
                commentDto.getContent(),
                LocalDateTime.now(),
                LocalDateTime.now(),
                0L,
                null,
                new ArrayList<>(),
                null,
                userInfo
        );
    }

    // 대댓글
    public static Comment toReplyEntity(UserInfo userInfo, Community community, CommentDto commentDto, Comment parent) {
        Comment reply = new Comment(
                null,
                community,
                community.getTitle(),
                userInfo.getNickname(),
                commentDto.getContent(),
                LocalDateTime.now(),
                LocalDateTime.now(),
                0L,
                parent, // 부모 설정
                new ArrayList<>(),
                null,
                userInfo
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
