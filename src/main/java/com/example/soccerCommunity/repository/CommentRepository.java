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

    // ★ NEW ★ 1+N 문제 없애는 버전
    @Query("SELECT DISTINCT c FROM Comment c " +
            "LEFT JOIN FETCH c.children cc " +
            "JOIN FETCH c.community co " +
            "JOIN FETCH c.userInfo ui " +
            "WHERE c.community.id = :communityId " +
            "AND c.parent IS NULL " +
            "ORDER BY c.createdAt ASC")
    List<Comment> findWithChildrenAndAssociationsByCommunityId(@Param("communityId") Long communityId);

    @Query("SELECT DISTINCT c FROM Comment c " +
            "LEFT JOIN FETCH c.children cc " +
            "JOIN FETCH c.community co " +
            "JOIN FETCH c.userInfo ui " +
            "WHERE c.community.id = :communityId " +
            "AND c.parent IS NULL " +
            "ORDER BY c.likesCount DESC")
    List<Comment> findWithChildrenAndAssociationsByCommunityIdOrderByLikesCount(@Param("communityId") Long communityId);

    @Query("SELECT c FROM Comment c " +
            "JOIN FETCH c.userInfo ui " +
            "JOIN FETCH ui.user u " +
            "LEFT JOIN FETCH c.parent p " +
            "WHERE c.community.id = :communityId")
    List<Comment> findAllCommentsWithUserInfo(@Param("communityId") Long communityId);
}
