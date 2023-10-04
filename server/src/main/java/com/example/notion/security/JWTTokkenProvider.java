package com.example.notion.security;

import com.example.notion.entities.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;

public class JWTTokkenProvider {
    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.ES256);

    static public String createToken(User user){
        Date now = new Date();
        Date expiration = new Date(now.getTime() + 86400000);

        String jwtToken = Jwts.builder()
                .setSubject("user")
                .setIssuer("http://localhost:8080")
                .claim("level", user.getLevel())
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(SECRET_KEY)
                .compact();

        return jwtToken;
    }
}
