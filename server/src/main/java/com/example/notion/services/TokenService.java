package com.example.notion.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.notion.entities.AuthenticationDTO;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private HttpServletResponse response;

    @Autowired
    private Algorithm algorithm;

    @Value("${jwt.cookieExpiry}")
    private int cookieExpiry;

    @Value("${api.security.token.secret}")
    private String secret;
    public void generateToken(AuthenticationDTO user) {
        try {

            if (user != null) {
                String token = JWT.create()
                        .withIssuer("auth-api")
                        .withSubject(user.getEmail())
                        .withExpiresAt(Instant.now().plusMillis(600000))
                        .sign(algorithm);

                ResponseCookie cookie = ResponseCookie.from("accessToken", token)
                        .httpOnly(true)
                        .secure(false)
                        .path("/")
                        .maxAge(cookieExpiry)
                        .build();
                response.addHeader("Set-Cookie", cookie.toString());
            }
        } catch (JWTVerificationException exception) {
            throw new RuntimeException("Error while generating token", exception);
        }
    }


    public String validateToken(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("auth-api")
                    .build() //Motando o dado
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception){
            return "";
        }
    }

    private Instant getExpirationDate(){
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
