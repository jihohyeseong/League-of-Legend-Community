package com.example.soccerCommunity.service;

import com.example.soccerCommunity.dto.CommentDto;
import com.example.soccerCommunity.entity.Comment;
import com.example.soccerCommunity.entity.Community;
import com.example.soccerCommunity.repository.CommentRepository;
import com.example.soccerCommunity.repository.CommunityRepository;
import com.example.soccerCommunity.repository.UserInfoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    public List<CommentDto> getComments(Long id) {

        List<Comment> commentList = commentRepository.findByCommunityId(id);

        return commentList.stream().map(CommentDto::toDto).toList();
    }

    @Transactional
    public CommentDto createComment(String username, Long id, CommentDto commentDto) {

        String nickname = userInfoRepository.findByUser_Username(username).getNickname();
        Community community = communityRepository.findById(id).orElse(null);
        if(community == null)
            return null;
        Comment comment = Comment.toEntity(nickname, community, commentDto);
        Comment created = commentRepository.save(comment);

        return CommentDto.toDto(created);
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

        if(comment == null || !comment.getNickname().equals(nickname))
            return null;

        commentRepository.delete(comment);

        return CommentDto.toDto(comment);
    }
}
