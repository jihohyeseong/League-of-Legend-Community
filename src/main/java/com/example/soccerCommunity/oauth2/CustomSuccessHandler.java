package com.example.soccerCommunity.oauth2;

import com.example.soccerCommunity.dto.CustomOAuth2User;
import com.example.soccerCommunity.jwt.JWTUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

@Component
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;

    public CustomSuccessHandler(JWTUtil jwtUtil){

        this.jwtUtil = jwtUtil;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        //OAuth2User
        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();

        String username = customUserDetails.getUsername();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        String token = jwtUtil.createJwt(username, role, 24*60*60*1000L);

        addSameSiteCookie(response, "Authorization", token);
        response.sendRedirect("https://react-lol-community.vercel.app/0");
    }

    private void addSameSiteCookie(HttpServletResponse response, String name, String value) {

        // SameSite=None; Secure 명시적으로 추가
        response.addHeader("Set-Cookie",
                String.format("%s=%s; Max-Age=%d; Path=/; Secure; HttpOnly; SameSite=None",
                        name, value, 24 * 60 * 60));
    }
}
