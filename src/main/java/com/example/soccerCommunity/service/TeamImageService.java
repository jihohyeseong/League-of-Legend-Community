package com.example.soccerCommunity.service;

import com.example.soccerCommunity.dto.TeamImageDto;
import com.example.soccerCommunity.entity.TeamImage;
import com.example.soccerCommunity.repository.TeamImageRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeamImageService {

    private final TeamImageRepository teamImageRepository;

    public TeamImageService(TeamImageRepository teamImageRepository){

        this. teamImageRepository = teamImageRepository;
    }

    public TeamImageDto getTeamImage(Long id) {

        TeamImage teamImage = teamImageRepository.findById(id).orElse(null);

        return TeamImageDto.toDto(teamImage);
    }

    public List<TeamImageDto> getTeamImageList() {

        List<TeamImage> teamImageList = teamImageRepository.findAll();
        List<TeamImageDto> dtoList = new ArrayList<>();

        for(TeamImage teamImage : teamImageList){

            TeamImageDto dto = TeamImageDto.toDto(teamImage);
            dtoList.add(dto);
        }

        return dtoList;
    }
}
