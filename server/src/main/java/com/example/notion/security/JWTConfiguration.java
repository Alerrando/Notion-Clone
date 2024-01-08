package com.example.notion.security;

import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JWTConfiguration {
    @Bean
    public Algorithm algorithm() {
        // Defina aqui a criação do algoritmo conforme suas necessidades
        // Exemplo: HMAC256 com uma chave secreta
        return Algorithm.HMAC256("sua_chave_secreta");
    }
}
