package com.example.soccerCommunity.repository;

import com.example.soccerCommunity.entity.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community, Long> {

    // 최신순으로 페이징 처리된 게시글 목록 조회
    Page<Community> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
