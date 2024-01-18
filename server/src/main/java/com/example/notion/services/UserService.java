package com.example.notion.services;

import com.example.notion.entities.*;
import com.example.notion.exception.UserNotFoundException;
import com.example.notion.repositorys.UserRepository;
import com.example.notion.util.Util;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    @Autowired
    private HttpServletResponse response;

    @Value("${jwt.cookieExpiry}")
    private int cookieExpiry;

    @Autowired
    Util util;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private EventLogService eventLogService;


    public List<User> findAll(){
        return userRepository.findAll();
    }

    public ResponseEntity findUser(AuthenticationDTO authenticationDTO) throws UserNotFoundException {
        User user = (User) userRepository.findUser(authenticationDTO.getEmail());
        if(user == null){
            throw new UserNotFoundException();
        }

        AuthenticationDTO auxAuthenticationDTO = new AuthenticationDTO(user.getEmail(), user.getPassword());
        tokenService.generateToken(auxAuthenticationDTO);

        EventLog eventLog = new EventLog(0, user, new Date(),"Login", "Id" + user.getId() + "- Nome" + user.getName() + " - Email" + user.getEmail());
        eventLogService.create(eventLog);
        this.addIdUserCookie(user.getId());
        UserDTO userDTO = new UserDTO(user.getAnnotations(), user.getRole());

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(userDTO);
    }

    public ResponseEntity create(@Valid User user){
        try {
            User optional = (User) userRepository.findUser(user.getEmail());
            if(optional == null || optional.equals(user)){
                String encryptedPassword = new BCryptPasswordEncoder().encode(user.getPassword());
                user.setPassword(encryptedPassword);
                user.setId(UUID.randomUUID().toString());

                AuthenticationDTO authenticationDTO = new AuthenticationDTO(user.getEmail(), user.getPassword());
                tokenService.generateToken(authenticationDTO);

                userRepository.save(user);
                this.addIdUserCookie(user.getId());

                EventLog eventLog = new EventLog(0, user, new Date(),"Registro", "Id" + user.getId() + "- Nome" + user.getName() + " - Email" + user.getEmail());
                eventLogService.create(eventLog);
                UserDTO userDTO = new UserDTO(user.getAnnotations(), user.getRole());

                return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
            }

            throw new UserNotFoundException();
        }
        catch (RuntimeException runtimeException){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(runtimeException);
        }
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUser(username);
    }

    public void addIdUserCookie(String id){
        Cookie cookie = new Cookie("idUser", id);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // Altere para true se estiver usando HTTPS
        cookie.setPath("/");
        cookie.setMaxAge(cookieExpiry);

        response.addCookie(cookie);
    }
}
