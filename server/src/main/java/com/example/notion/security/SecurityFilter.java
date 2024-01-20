package com.example.notion.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.example.notion.repositorys.UserRepository;
import com.example.notion.services.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Component
// (OncePerRequestFilter) - Acontece uma vez a cada requisição
public class SecurityFilter extends OncePerRequestFilter  {
    @Autowired
    TokenService tokenService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private Algorithm algorithm; // Definir o algoritmo de assinatura

    @Value("${api.security.token.secret}")
    private String secret;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("accessToken")) {
                    String token = cookie.getValue();
                    var subject = tokenService.validateToken(token);
                    UserDetails user = userRepository.findUser(subject);
                    if(user != null){
                        var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}
