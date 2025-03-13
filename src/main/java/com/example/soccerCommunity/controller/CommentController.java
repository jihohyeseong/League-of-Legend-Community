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

    @GetMapping("/{communityId}/comment")
    public ResponseEntity<List<CommentDto>> getComments(@PathVariable Long communityId){

        List<CommentDto> dtoList = commentService.getComments(communityId);

        return ResponseEntity.status(HttpStatus.OK).body(dtoList);
    }

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

    @DeleteMapping("/{id}/comment")
    public ResponseEntity<CommentDto> deleteComment(@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
                                                    @PathVariable Long id){

        String username = customOAuth2User.getUsername();
        CommentDto dto = commentService.deleteComment(username, id);

        return (dto != null) ?
                ResponseEntity.status(HttpStatus.CREATED).body(dto) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

}
