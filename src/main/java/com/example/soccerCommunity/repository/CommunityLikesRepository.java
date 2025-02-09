package com.example.soccerCommunity.repository;

import com.example.soccerCommunity.entity.CommunityLikes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityLikesRepository extends JpaRepository<CommunityLikes, Long> {

    boolean existsByCommunityIdAndUserId(Long communityId, Long userId);

    void deleteByCommunity_IdIn(List<Long> communityIds);
}
