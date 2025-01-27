package com.example.soccerCommunity.dto;

import java.util.Map;

public class KakaoResponse implements OAuth2Response{

    private final Map<String, Object> attribute;
    private final String id;

    public KakaoResponse(Map<String, Object> attribute){
        this.attribute = (Map<String, Object>) attribute.get("kakao_account");
        this.id = attribute.get("id").toString();
    }

    @Override
    public String getProvider() {

        return "kakao";
    }

    @Override
    public String getProviderId() {

        return id;
    }

    @Override
    public String getEmail() {

        return attribute.get("email").toString();
    }

    @Override
    public String getName() {

        return attribute.getOrDefault("name","unknown").toString();
    }
}
