package com.example.notion.security.filters;

import com.example.notion.entities.LevelRequired;
import com.example.notion.security.JWTTokkenProvider;
import io.jsonwebtoken.Claims;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerMapping;

import java.io.IOException;
import java.lang.reflect.Method;

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

                HandlerMethod handlerMethod = (HandlerMethod) req.getAttribute(HandlerMapping.BEST_MATCHING_HANDLER_ATTRIBUTE);
                Method method = handlerMethod.getMethod();


                if(method.isAnnotationPresent(LevelRequired.class)){
                    LevelRequired levelRequired = method.getAnnotation(LevelRequired.class);
                    int levelNecessary = levelRequired.value();

                    if (level >= levelNecessary) {
                        servletRequest.setAttribute("level", level);
                        filterChain.doFilter(servletRequest, servletResponse);
                    } else {
                        ((HttpServletResponse) servletResponse).setStatus(HttpServletResponse.SC_FORBIDDEN);
                        servletResponse.getOutputStream().write("Acesso proibido".getBytes());
                    }
                }
            }
            else{
                ((HttpServletResponse)servletResponse).setStatus(500);
                servletResponse.getOutputStream().write("Não Autorizado".getBytes());
            }
        }
    }
}
