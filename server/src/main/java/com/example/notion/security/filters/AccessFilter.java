package com.example.notion.security.filters;

import com.example.notion.security.JWTTokkenProvider;
import io.jsonwebtoken.Claims;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.IOException;

@CrossOrigin
public class AccessFilter implements Filter {

    //ServletRequest: Interface que serve para acessar informações sobre a solicitação, como cabeçalhos, parâmetros e sessões.
    //ServletResponse: Interface que serve para para definir cabeçalhos, escrever dados na resposta e redirecionar o cliente.
    //FilterChain: Interface que permite chamar o próximo filtro na cadeia de filtros ou a servlet que manipulará a solicitação.
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        String token = req.getHeader("Authorization");

        if(req.getMethod().equals("Options")){
            filterChain.doFilter(servletRequest, servletResponse);
        }
        else{
            if(token != null && JWTTokkenProvider.verifyToken(token)){
                Claims claims = JWTTokkenProvider.getAllClaimsFromToken(token);
                Integer level = (Integer) claims.get("level");
                servletRequest.setAttribute("level", level);
                filterChain.doFilter(servletRequest, servletResponse);
            }
            else{
                ((HttpServletResponse)servletResponse).setStatus(500);
                servletResponse.getOutputStream().write("Não Autorizado".getBytes());
            }
        }
    }
}
