package com.example.soccerCommunity.repository;

import com.example.soccerCommunity.entity.CommunityLikes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityLikesRepository extends JpaRepository<CommunityLikes, Long> {

    boolean existsByCommunityIdAndUserId(Long communityId, Long userId);
}
