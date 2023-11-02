package com.example.notion.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {

    public void addCorsMapping(CorsRegistry config){
        config.addMapping("/security/**")
                .allowedHeaders("*") //Define uma lista de header que uma solicitação pode ter como permitido uma solicitação real.
                .allowedMethods("GET", "POST", "PUT", "DELETE") //Define os métodos HTTP
                .allowedOrigins("http://localhost:5173/") //Define uma ou mais url origem que pode fazer uma requisição
                .allowCredentials(true); // Se o navegador deve enviar credenciais, como cookies, junto com solicitações entre domínios.
    }
}
