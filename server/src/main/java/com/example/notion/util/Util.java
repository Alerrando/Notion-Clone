package com.example.notion.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Util {
    @Autowired
    HttpServletRequest request;

    public String getIdUserCookie(){
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("idUser")) {
                    String idUser = cookie.getValue();

                    return idUser;
                }
            }
        }

        return "";
    }
}
