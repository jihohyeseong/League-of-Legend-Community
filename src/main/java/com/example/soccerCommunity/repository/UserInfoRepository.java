package com.example.soccerCommunity.repository;

import com.example.soccerCommunity.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {

    UserInfo findByUser_Username(String username);

    boolean existsByNickname(String nickname);
}
