package com.example.soccerCommunity.controller;

import com.example.soccerCommunity.dto.CommunityDto;
import com.example.soccerCommunity.dto.CustomOAuth2User;
import com.example.soccerCommunity.service.CommunityService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class CommunityController {

    private final CommunityService communityService;

    public CommunityController(CommunityService communityService){

        this.communityService = communityService;
    }

    // 게시글 리스트
    @GetMapping("/community")
    public ResponseEntity<Page<CommunityDto>> getAllCommunity(@RequestParam(defaultValue = "0") int page){

        int pageSize = 20; // 한 페이지에 표시할 게시글 수
        Page<CommunityDto> communityPage = communityService.getCommunityPage(page, pageSize);

        return ResponseEntity.status(HttpStatus.OK).body(communityPage);
    }

    // 10추글 리스트
    @GetMapping("/community/popularity")
    public ResponseEntity<Page<CommunityDto>> getPopularityCommunity(@RequestParam(defaultValue = "0") int page){

        int pageSize = 20;
        Page<CommunityDto> communityPage = communityService.getPopularityPage(page, pageSize);

        return ResponseEntity.status(HttpStatus.OK).body(communityPage);
    }

    // 게시글 검색
    @GetMapping("/community/search/{title}")
    public ResponseEntity<Page<CommunityDto>> communitySearchByTitle(@RequestParam(defaultValue = "0") int page,
                                                                     @PathVariable String title){

        int pageSize = 20;
        Page<CommunityDto> communityPage = communityService.searchByTitle(page, pageSize, title);

        return ResponseEntity.status(HttpStatus.OK).body(communityPage);
    }

    // 게시글 상세
    @GetMapping("/community/{id}")
    public ResponseEntity<CommunityDto> getCommunity(@PathVariable Long id){

        CommunityDto communityDto = communityService.getCommunity(id);

        return (communityDto != null) ?
                ResponseEntity.status(HttpStatus.OK).body(communityDto) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    // 게시글 작성
    @PostMapping("/community")
    public ResponseEntity<CommunityDto> postCommunity(@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
                                                      @RequestBody CommunityDto communityDto){

        String username = customOAuth2User.getUsername();
        CommunityDto dto = communityService.postCommunity(username, communityDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    // 게시글 수정
    @PatchMapping("/community/{id}")
    public ResponseEntity<CommunityDto> patchCommunity(@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
                                                       @PathVariable Long id,
                                                       @RequestBody CommunityDto communityDto){

        String username = customOAuth2User.getUsername();
        CommunityDto dto = communityService.patchCommunity(username, id, communityDto);

        return (dto != null) ?
                ResponseEntity.status(HttpStatus.OK).body(dto) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    // 게시글 삭제
    @DeleteMapping("/community/{id}")
    public ResponseEntity<CommunityDto> deleteCommunity(@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
                                                        @PathVariable Long id){

        String username = customOAuth2User.getUsername();
        CommunityDto dto = communityService.deleteCommunity(username, id);

        return (dto != null) ?
                ResponseEntity.status(HttpStatus.OK).body(dto) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    // 게시글 추천
    @PostMapping("community/{id}/like")
    public ResponseEntity<String> communityLikeButton(@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
                                                      @PathVariable Long id){

        String username = customOAuth2User.getUsername();

        boolean beforeLiked = communityService.checkBeforeLiked(username, id);

        return beforeLiked ?
                ResponseEntity.status(HttpStatus.OK).body("이 글을 좋아합니다.") :
                ResponseEntity.status(HttpStatus.OK).body("이미 좋아요를 누르셨습니다.");
    }

    // 내가 쓴 글
    @GetMapping("community/my")
    public ResponseEntity<List<CommunityDto>> myCommunityList(@AuthenticationPrincipal CustomOAuth2User customOAuth2User){

        String username = customOAuth2User.getUsername();

        List<CommunityDto> myList = communityService.getMyCommunityList(username);

        return ResponseEntity.status(HttpStatus.OK).body(myList);
    }

}
