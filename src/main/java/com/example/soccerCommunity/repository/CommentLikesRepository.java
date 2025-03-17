package com.example.soccerCommunity.repository;

import com.example.soccerCommunity.entity.CommentLikes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikesRepository extends JpaRepository<CommentLikes, Long> {

    boolean existsByCommentIdAndUserId(Long commentId, Long userId);
}
