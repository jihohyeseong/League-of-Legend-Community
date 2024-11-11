package com.example.soccerCommunity.controller;

import com.example.soccerCommunity.dto.CommunityDto;
import com.example.soccerCommunity.dto.CustomOAuth2User;
import com.example.soccerCommunity.service.CommunityService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
public class CommunityController {

    private final CommunityService communityService;

    public CommunityController(CommunityService communityService){

        this.communityService = communityService;
    }

    @GetMapping("/community")
    public ResponseEntity<Page<CommunityDto>> getAllCommunity(@RequestParam(defaultValue = "0") int page){

        int pageSize = 20; // 한 페이지에 표시할 게시글 수
        Page<CommunityDto> communityPage = communityService.getCommunityPage(page, pageSize);

        return ResponseEntity.status(HttpStatus.OK).body(communityPage);
    }

    @GetMapping("/community/{id}")
    public ResponseEntity<CommunityDto> getCommunity(@PathVariable Long id){

        CommunityDto communityDto = communityService.getCommunity(id);

        return (communityDto != null) ?
                ResponseEntity.status(HttpStatus.OK).body(communityDto) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping("/community")
    public ResponseEntity<CommunityDto> postCommunity(@AuthenticationPrincipal CustomOAuth2User customOAuth2User,
                                                      @RequestBody CommunityDto communityDto){

        String username = customOAuth2User.getUsername();
        CommunityDto dto = communityService.postCommunity(username, communityDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }
}
