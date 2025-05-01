package com.example.soccerCommunity.service;

import com.example.soccerCommunity.dto.CustomOAuth2User;
import com.example.soccerCommunity.dto.UserDto;
import com.example.soccerCommunity.dto.UserInfoDto;
import com.example.soccerCommunity.entity.*;
import com.example.soccerCommunity.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;

    private final CommentRepository commentRepository;

    private final CommunityRepository communityRepository;

    private final CommunityLikesRepository communityLikesRepository;

    public UserService(UserRepository userRepository, UserInfoRepository userInfoRepository,
                       CommentRepository commentRepository, CommunityRepository communityRepository,
                       CommunityLikesRepository communityLikesRepository){

        this.userRepository = userRepository;
        this.userInfoRepository = userInfoRepository;
        this.commentRepository = commentRepository;
        this.communityRepository = communityRepository;
        this.communityLikesRepository = communityLikesRepository;
    }


    public UserDto myInfo(String username) {

        User user = userRepository.findByUsername(username);

        return UserDto.toDto(user);
    }

    public UserInfoDto detailInfo(String username) {

        UserInfo userInfo = userInfoRepository.findByUser_Username(username);

        return UserInfo.toDto(userInfo);
    }

    @Transactional
    public UserInfoDto setDetailInfo(String username, UserInfoDto userInfoDto) {

        User user = userRepository.findByUsername(username);
        UserInfo userInfo = UserInfoDto.toEntity(user, userInfoDto);

        UserInfo created = userInfoRepository.save(userInfo);

        return UserInfo.toDto(created);
    }

    public boolean checkNickname(String nickname) {

        return !userInfoRepository.existsByNickname(nickname);
    }

    @Transactional
    public UserInfoDto patchDetailInfo(String username, UserInfoDto userInfoDto) {

        UserInfo userInfo = userInfoRepository.findByUser_Username(username);
        String oldNickname = userInfo.getNickname();
        String newNickname = userInfoDto.getNickname();

        List<Comment> comments = commentRepository.findByNickname(oldNickname);
        for(Comment comment : comments){
            comment.setNickname(newNickname);
        }
        commentRepository.saveAll(comments);

        List<CommunityLikes> communityLikes = communityLikesRepository.findByNickname(oldNickname);
        for(CommunityLikes cl : communityLikes){
            cl.setNickname(newNickname);
        }
        communityLikesRepository.saveAll(communityLikes);

        List<Community> communities = communityRepository.findByNickname(oldNickname);
        for(Community community : communities){
            community.setNickname(newNickname);
        }
        communityRepository.saveAll(communities);

        userInfo.setNickname(newNickname);
        UserInfo patched = userInfoRepository.save(userInfo);

        return UserInfo.toDto(patched);
    }

    public UserInfoDto patchTeamInfo(String username, UserInfoDto userInfoDto) {

        UserInfo userInfo = userInfoRepository.findByUser_Username(username);
        userInfo.setImageUrl(userInfoDto.getImageUrl());
        UserInfo patched = userInfoRepository.save(userInfo);

        return UserInfo.toDto(patched);
    }

    @Transactional
    public UserInfoDto deleteDetailInfo(String username) {

        UserInfo userInfo = userInfoRepository.findByUser_Username(username);
        User user = userRepository.findByUsername(username);
        String nickname = userInfo.getNickname();

        // 1. 유저가 작성한 모든 커뮤니티 게시글 ID 가져오기
        List<Long> communityIds = communityRepository.findByNickname(nickname)
                .stream()
                .map(Community::getId)
                .toList();

        // 2. 좋아요(CommunityLikes) 데이터 먼저 삭제
        communityLikesRepository.deleteByCommunity_IdIn(communityIds);
        List<CommunityLikes> likes = communityLikesRepository.findByNickname(nickname);
        communityLikesRepository.deleteAll(likes);

        // 3. 해당 커뮤니티 ID를 참조하는 모든 댓글 삭제
        List<Comment> comments = commentRepository.findByCommunity_IdIn(communityIds);
        commentRepository.deleteAll(comments);

        List<Comment> myComments = commentRepository.findByNickname(nickname);
        commentRepository.deleteAll(myComments);

        // 4. 유저가 작성한 커뮤니티 게시글 삭제
        List<Community> communities = communityRepository.findByNickname(nickname);
        communityRepository.deleteAll(communities);

        userInfoRepository.delete(userInfo);
        userRepository.delete(user);

        return UserInfo.toDto(userInfo);
    }

}
