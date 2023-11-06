package com.example.notion.services;

import com.example.notion.entities.AuthenticationDTO;
import com.example.notion.entities.User;
import com.example.notion.repositorys.UserRepository;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.*;

@Service
@Validated
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenService tokenService;


    public List<User> findAll(){
        return userRepository.findAll();
    }

    public ResponseEntity findUser(AuthenticationDTO authenticationDTO, AuthenticationManager authenticationManager) {
        try {
            Map<String, Object> response = new HashMap<>();
            UserDetails user = userRepository.findUser(authenticationDTO.email());
            var userEmailPassword = new UsernamePasswordAuthenticationToken(authenticationDTO.email(), authenticationDTO.password());
            var auth = authenticationManager.authenticate(userEmailPassword);

            var token = tokenService.generateToken((User) auth.getPrincipal());

            response.put("token", token);
            response.put("user", user);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }

    }

    public ResponseEntity create(@Valid User user){
        try {
            if(user.getName() != null && user.getEmail() != null && user.getUsername() != null && user.getRole() != null){
                UserDetails optional = userRepository.findUser(user.getEmail());

                if(optional != null && optional.equals(user)){
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário Já Cadastrado");
                }
                else {
                    String encryptedPassword = new BCryptPasswordEncoder().encode(user.getPassword());
                    user.setPassword(encryptedPassword);

                    return ResponseEntity.status(HttpStatus.CREATED).body(userRepository.save(user));
                }
            }
            else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Alguns dados estão faltando");
            }
        }
        catch (RuntimeException runtimeException){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(runtimeException);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUser(username);
    }
}
