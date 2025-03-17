package com.example.soccerCommunity.service;

import com.example.soccerCommunity.dto.CommentDto;
import com.example.soccerCommunity.entity.Comment;
import com.example.soccerCommunity.entity.CommentLikes;
import com.example.soccerCommunity.entity.Community;
import com.example.soccerCommunity.entity.UserInfo;
import com.example.soccerCommunity.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserInfoRepository userInfoRepository;
    private final CommunityRepository communityRepository;
    private final CommentLikesRepository commentLikesRepository;

    public CommentService(CommentRepository commentRepository, UserInfoRepository userInfoRepository, CommunityRepository communityRepository, CommentLikesRepository commentLikesRepository){

        this.commentRepository = commentRepository;
        this.userInfoRepository = userInfoRepository;
        this.communityRepository = communityRepository;
        this.commentLikesRepository = commentLikesRepository;
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

    public boolean checkBeforeLiked(String username, Long id) {

        UserInfo userInfo = userInfoRepository.findByUser_Username(username);
        Comment comment = commentRepository.findById(id).orElse(null);

        if(!commentLikesRepository.existsByCommentIdAndUserId(id, userInfo.getUser().getId())){
            CommentLikes commentLikes = CommentLikes.create(userInfo.getUser(), comment, userInfo.getNickname());
            commentLikesRepository.save(commentLikes);
            comment.setLikesCount(comment.getLikesCount() + 1L);
            commentRepository.save(comment);
        }
        else return false;

        return true;
    }
}
