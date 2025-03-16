package com.example.soccerCommunity.repository;

import com.example.soccerCommunity.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByCommunityId(Long id);

    List<Comment> findByNickname(String nickname);

    List<Comment> findByCommunity_IdIn(List<Long> communityIds);

    List<Comment> findByCommunityIdAndParentIsNullOrderByCreatedAtAsc(Long communityId);
}
