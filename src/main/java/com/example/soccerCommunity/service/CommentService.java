package com.example.soccerCommunity.service;

import com.example.soccerCommunity.dto.CommentDto;
import com.example.soccerCommunity.entity.Comment;
import com.example.soccerCommunity.entity.Community;
import com.example.soccerCommunity.repository.CommentRepository;
import com.example.soccerCommunity.repository.CommunityRepository;
import com.example.soccerCommunity.repository.UserInfoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserInfoRepository userInfoRepository;
    private final CommunityRepository communityRepository;

    public CommentService(CommentRepository commentRepository, UserInfoRepository userInfoRepository, CommunityRepository communityRepository){

        this.commentRepository = commentRepository;
        this.userInfoRepository = userInfoRepository;
        this.communityRepository = communityRepository;
    }

    public List<CommentDto> getComments(Long communityId) {

        List<Comment> allComments = commentRepository.findByCommunityIdAndParentIsNullOrderByCreatedAtAsc(communityId);

        return allComments.stream().map(CommentDto::toDto).collect(Collectors.toList());
    }

    @Transactional
    public CommentDto createComment(String username, Long id, CommentDto commentDto) {

        String nickname = userInfoRepository.findByUser_Username(username).getNickname();
        Community community = communityRepository.findById(id).orElse(null);
        if(community == null)
            return null;
        community.setCommentsCount(community.getCommentsCount() + 1L);
        communityRepository.save(community);
        Comment comment = Comment.toEntity(nickname, community, commentDto);
        Comment created = commentRepository.save(comment);

        return CommentDto.toDto(created);
    }

    @Transactional
    public CommentDto createReply(String username, Long communityId, Long parentId, CommentDto commentDto) {
        String nickname = userInfoRepository.findByUser_Username(username).getNickname();
        Community community = communityRepository.findById(communityId).orElse(null);
        Comment parentComment = commentRepository.findById(parentId).orElse(null);

        if (community == null || parentComment == null) return null;

        Comment reply = Comment.toReplyEntity(nickname, community, commentDto, parentComment);
        Comment createdReply = commentRepository.save(reply);

        return CommentDto.toDto(createdReply);
    }

    public CommentDto updateComment(String username, Long id, CommentDto commentDto) {

        String nickname = userInfoRepository.findByUser_Username(username).getNickname();
        Comment comment = commentRepository.findById(id).orElse(null);

        if(comment == null || !comment.getNickname().equals(nickname))
            return null;

        comment.patch(nickname, commentDto);
        Comment result = commentRepository.save(comment);

        return CommentDto.toDto(result);
    }

    public CommentDto deleteComment(String username, Long id) {

        String nickname = userInfoRepository.findByUser_Username(username).getNickname();
        Comment comment = commentRepository.findById(id).orElse(null);
        Community community = communityRepository.findById(comment.getCommunity().getId()).orElse(null);

        if(comment == null || !comment.getNickname().equals(nickname))
            return null;

        community.setCommentsCount(community.getCommentsCount() - 1L);
        communityRepository.save(community);

        // 대댓글이 있는 경우 내용만 "삭제된 댓글입니다."로 변경
        if (!comment.getChildren().isEmpty()) {
            comment.setContent("삭제된 댓글입니다.");
            commentRepository.save(comment);
        } else {
            commentRepository.delete(comment);
        }

        return CommentDto.toDto(comment);
    }
}
