package com.example.soccerCommunity.controller;

import com.example.soccerCommunity.dto.TeamImageDto;
import com.example.soccerCommunity.service.TeamImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TeamImageController {

    private final TeamImageService teamImageService;

    public TeamImageController(TeamImageService teamImageService){

        this.teamImageService = teamImageService;
    }

    // 팀 이미지 가져오기
    @GetMapping("/image/{id}")
    public ResponseEntity<TeamImageDto> getTeamImage(@PathVariable Long id){

        TeamImageDto dto = teamImageService.getTeamImage(id);

        return (dto != null) ?
                ResponseEntity.status(HttpStatus.OK).body(dto) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    // 팀 이미지 리스트
    @GetMapping("/image/list")
    public ResponseEntity<List<TeamImageDto>> getTeamImageList(){

        List<TeamImageDto> dtoList = teamImageService.getTeamImageList();

        return ResponseEntity.status(HttpStatus.OK).body(dtoList);
    }
}
