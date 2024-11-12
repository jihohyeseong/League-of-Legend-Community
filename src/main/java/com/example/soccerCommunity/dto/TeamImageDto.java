package com.example.soccerCommunity.dto;

import com.example.soccerCommunity.entity.TeamImage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeamImageDto {

    private Long id;
    private String team;
    private String imageUrl;

    public static TeamImageDto toDto(TeamImage teamImage) {

        return new TeamImageDto(
                teamImage.getId(),
                teamImage.getTeam(),
                teamImage.getImageUrl()
        );
    }
}
