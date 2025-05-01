package com.example.soccerCommunity.repository;

import com.example.soccerCommunity.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByCommunityId(Long id);

    List<Comment> findByNickname(String nickname);

    List<Comment> findByCommunity_IdIn(List<Long> communityIds);

    @Query("SELECT c FROM Comment c " +
            "JOIN FETCH c.userInfo ui " +
            "JOIN FETCH ui.user u " +
            "LEFT JOIN FETCH c.parent p " +
            "WHERE c.community.id = :communityId")
    List<Comment> findAllCommentsWithUserInfo(@Param("communityId") Long communityId);

    @Query("SELECT DISTINCT c FROM Comment c " +
            "JOIN FETCH c.userInfo ui " +
            "JOIN FETCH ui.user u " +
            "LEFT JOIN FETCH c.parent p " +
            "WHERE c.community.id = :communityId " +
            "ORDER BY c.likesCount DESC")
    List<Comment> findAllCommentsWithUserInfoOrderByLikesCount(@Param("communityId") Long communityId);
}
