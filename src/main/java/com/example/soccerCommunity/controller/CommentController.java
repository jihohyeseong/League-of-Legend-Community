package com.example.soccerCommunity.controller;

import com.example.soccerCommunity.dto.CommentDto;
import com.example.soccerCommunity.dto.CustomOAuth2User;
import com.example.soccerCommunity.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService){

        this.commentService = commentService;
    }
    // 댓글 보기
    @GetMapping("/{communityId}/comment")
    public ResponseEntity<List<CommentDto>> getComments(@PathVariable Long communityId){

        List<CommentDto> dtoList = commentService.getComments(communityId);

        return ResponseEntity.status(HttpStatus.OK).body(dtoList);
    }

    // 댓글 인기순 보기
    @GetMapping("/{communityId}/comment/popularity")
    public ResponseEntity<List<CommentDto>> getPopularityComments(@PathVariable Long communityId){

        List<CommentDto> dtoList = commentService.getPopularityComments(communityId);

        return ResponseEntity.status(HttpStatus.OK).body(dtoList);
    }

    // 댓글 생성
    @PostMapping("/{communityId}/comment")
    public ResponseEntity<CommentDto> createComment(@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
                                                    @PathVariable Long communityId,
                                                    @RequestBody CommentDto commentDto){

        String username = customOAuth2User.getUsername();
        CommentDto dto = commentService.createComment(username, communityId, commentDto);

        return (dto != null) ?
                ResponseEntity.status(HttpStatus.CREATED).body(dto) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
    // 대댓글 생성
    @PostMapping("/{communityId}/{parentId}/comment")
    public ResponseEntity<CommentDto> createReply(@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
                                                    @PathVariable Long communityId,
                                                    @PathVariable Long parentId,
                                                    @RequestBody CommentDto commentDto){

        String username = customOAuth2User.getUsername();
        CommentDto dto = commentService.createReply(username, communityId, parentId, commentDto);

        return (dto != null) ?
                ResponseEntity.status(HttpStatus.CREATED).body(dto) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    // 댓글 수정
    @PatchMapping("/{id}/comment")
    public ResponseEntity<CommentDto> updateComment(@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
                                                    @PathVariable Long id,
                                                    @RequestBody CommentDto commentDto){

        String username = customOAuth2User.getUsername();
        CommentDto dto = commentService.updateComment(username, id, commentDto);

        return (dto != null) ?
                ResponseEntity.status(HttpStatus.CREATED).body(dto) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    // 댓글 삭제
    @DeleteMapping("/{id}/comment")
    public ResponseEntity<CommentDto> deleteComment(@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
                                                    @PathVariable Long id){

        String username = customOAuth2User.getUsername();
        CommentDto dto = commentService.deleteComment(username, id);

        return (dto != null) ?
                ResponseEntity.status(HttpStatus.OK).body(dto) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    // 내가 쓴 댓글
    @GetMapping("/comment/my")
    public ResponseEntity<List<CommentDto>> myComments(@AuthenticationPrincipal CustomOAuth2User customOAuth2User){

        String username = customOAuth2User.getUsername();
        List<CommentDto> myComments = commentService.getMyComments(username);

        return ResponseEntity.status(HttpStatus.OK).body(myComments);
    }

    // 댓글 좋아요
    @PostMapping("/{id}/like")
    public ResponseEntity<String> likesComment(@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
                                               @PathVariable Long id,
                                               @RequestParam String likeType){

        String username = customOAuth2User.getUsername();
        boolean beforeLiked = commentService.checkBeforeLiked(username, id, likeType);

        return beforeLiked ?
                ResponseEntity.status(HttpStatus.OK).body("이 댓글을 " + (likeType.equals("like") ? "좋아합니다." : "싫어합니다.")) :
                ResponseEntity.status(HttpStatus.OK).body("이미 공감한 댓글입니다.");
    }

}
