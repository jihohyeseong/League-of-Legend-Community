package com.example.soccerCommunity.service;

import com.example.soccerCommunity.dto.CommunityDto;
import com.example.soccerCommunity.entity.Comment;
import com.example.soccerCommunity.entity.Community;
import com.example.soccerCommunity.entity.CommunityLikes;
import com.example.soccerCommunity.entity.UserInfo;
import com.example.soccerCommunity.repository.CommentRepository;
import com.example.soccerCommunity.repository.CommunityLikesRepository;
import com.example.soccerCommunity.repository.CommunityRepository;
import com.example.soccerCommunity.repository.UserInfoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final UserInfoRepository userInfoRepository;
    private final CommunityLikesRepository communityLikesRepository;
    private final CommentRepository commentRepository;

    public CommunityService(CommunityRepository communityRepository,
                            UserInfoRepository userInfoRepository,
                            CommunityLikesRepository communityLikesRepository,
                            CommentRepository commentRepository){

        this.communityRepository = communityRepository;
        this.userInfoRepository = userInfoRepository;
        this.communityLikesRepository = communityLikesRepository;
        this.commentRepository = commentRepository;
    }

    public Page<CommunityDto> getCommunityPage(int page, int pageSize) {

        PageRequest pageRequest = PageRequest.of(page, pageSize);
        Page<Community> communityPage = communityRepository.findAllByOrderByCreatedAtDesc(pageRequest);

        return communityPage.map(Community::toDto);
    }

    public CommunityDto getCommunity(Long id) {

        Community community = communityRepository.findById(id).orElse(null);
        if(community != null) {
            community.setViewsCount(community.getViewsCount() + 1L);
            communityRepository.save(community);
        }
        return Community.toDto(community);
    }

    @Transactional
    public CommunityDto postCommunity(String username, CommunityDto communityDto) {

        UserInfo userInfo = userInfoRepository.findByUser_Username(username);
        String nickname = userInfo.getNickname();

        Community community = CommunityDto.toEntity(nickname, communityDto);
        Community created = communityRepository.save(community);

        return Community.toDto(created);
    }

    @Transactional
    public CommunityDto patchCommunity(String username, Long id, CommunityDto communityDto) {

        UserInfo userInfo = userInfoRepository.findByUser_Username(username);
        Community target = communityRepository.findById(id).orElse(null);
        if(target == null || !target.getNickname().equals(userInfo.getNickname()))
            return null;
        Community community = CommunityDto.toEntity(userInfo.getNickname(), communityDto);

        target.patch(userInfo, community);

        Community result = communityRepository.save(target);

        return Community.toDto(result);
    }

    @Transactional
    public CommunityDto deleteCommunity(String username, Long id) {

        UserInfo userInfo = userInfoRepository.findByUser_Username(username);
        Community target = communityRepository.findById(id).orElse(null);
        List<Comment> comments = commentRepository.findByCommunityId(id);

        if(target == null || !target.getNickname().equals(userInfo.getNickname())){
            return null;
        }

        commentRepository.deleteAll(comments);
        communityRepository.delete(target);

        return Community.toDto(target);
    }

    @Transactional
    public boolean checkBeforeLiked(String username, Long id) {

        UserInfo userInfo = userInfoRepository.findByUser_Username(username);
        Community community = communityRepository.findById(id).orElse(null);

        if(!communityLikesRepository.existsByCommunityIdAndUserId(community.getId(), userInfo.getUser().getId())) {
            CommunityLikes communityLikes = CommunityLikes.create(userInfo.getUser(), community, userInfo.getNickname());
            communityLikesRepository.save(communityLikes);
            community.setLikesCount(community.getLikesCount() + 1L);
            communityRepository.save(community);
        }
        else return false;

        return true;

    }

    public Page<CommunityDto> getPopularityPage(int page, int pageSize) {

        PageRequest pageRequest = PageRequest.of(page, pageSize);
        Page<Community> communityPage = communityRepository.findByLikesCountGreaterThanEqual(10L, pageRequest);

        return communityPage.map(Community::toDto);
    }

    public Page<CommunityDto> searchByTitle(int page, int pageSize, String title) {

        PageRequest pageRequest = PageRequest.of(page, pageSize);
        Page<Community> communityPage = communityRepository.findByTitleContainingIgnoreCase(title, pageRequest);

        return communityPage.map(Community::toDto);
    }

    public List<CommunityDto> getMyCommunityList(String username) {

        UserInfo userInfo = userInfoRepository.findByUser_Username(username);
        String nickname = userInfo.getNickname();

        List<Community> communities = communityRepository.findByNickname(nickname);

        return communities.stream().map(Community::toDto).collect(Collectors.toList());
    }

    public List<CommunityDto> getMyCommunityLikes(String username) {

        UserInfo userInfo = userInfoRepository.findByUser_Username(username);
        String nickname = userInfo.getNickname();
        List<Long> communityIds = communityLikesRepository.findByNickname(nickname)
                .stream()
                .map(CommunityLikes::getCommunity)
                .map(Community::getId)
                .toList();

        List<Community> communities = communityRepository.findAllById(communityIds);

        return communities.stream().map(Community::toDto).collect(Collectors.toList());
    }

    public List<CommunityDto> getCategoryList(String category) {

        List<Community> communities = communityRepository.findByCategory(category);

        return communities.stream().map(Community::toDto).collect(Collectors.toList());
    }

    public Page<CommunityDto> searchByContent(int page, int pageSize, String content) {

        PageRequest pageRequest = PageRequest.of(page, pageSize);
        Page<Community> communityPage = communityRepository.findByContentContainingIgnoreCase(content, pageRequest);

        return communityPage.map(Community::toDto);
    }

    public Page<CommunityDto> searchByNickname(int page, int pageSize, String nickname) {

        PageRequest pageRequest = PageRequest.of(page, pageSize);
        Page<Community> communityPage = communityRepository.findByNicknameContainingIgnoreCase(nickname, pageRequest);

        return communityPage.map(Community::toDto);
    }

    public Page<CommunityDto> searchByTitleOrContent(int page, int pageSize, String title, String content) {

        Pageable pageable = PageRequest.of(page, pageSize);

        if (title != null && content != null) {
            return communityRepository
                    .findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(title, content, pageable)
                    .map(Community::toDto);
        } else if (title != null) {
            return communityRepository
                    .findByTitleContainingIgnoreCase(title, pageable)
                    .map(Community::toDto);
        } else if (content != null) {
            return communityRepository
                    .findByContentContainingIgnoreCase(content, pageable)
                    .map(Community::toDto);
        } else {
            return Page.empty();
        }
    }
}
