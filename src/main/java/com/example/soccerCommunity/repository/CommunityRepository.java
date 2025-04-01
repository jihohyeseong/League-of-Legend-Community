package com.example.soccerCommunity.repository;

import com.example.soccerCommunity.entity.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CommunityRepository extends JpaRepository<Community, Long> {

    // 최신순으로 페이징 처리된 게시글 목록 조회
    Page<Community> findAllByOrderByCreatedAtDesc(Pageable pageable);

    Page<Community> findByLikesCountGreaterThanEqual(Long likesCount, Pageable pageable);

    Page<Community> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    Page<Community> findByNicknameContainingIgnoreCase(String nickname, Pageable pageable);

    Page<Community> findByContentContainingIgnoreCase(String content, Pageable pageable);

    Page<Community> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(String title, String content, Pageable pageable);

    List<Community> findByNickname(String nickname);

    List<Community> findByCategory(String category);
}
