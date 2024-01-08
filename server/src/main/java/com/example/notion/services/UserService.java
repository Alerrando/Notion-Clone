package com.example.notion.services;

import com.example.notion.entities.*;
import com.example.notion.repositorys.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.*;

@Service
@Validated
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private EventLogService eventLogService;


    public List<User> findAll(){
        return userRepository.findAll();
    }

    public ResponseEntity findUser(AuthenticationDTO authenticationDTO) {
        try {
            User user = (User) userRepository.findUser(authenticationDTO.getEmail());
            if(user.getEmail().equals(authenticationDTO.getEmail())){
                tokenService.generateToken(authenticationDTO);

                EventLog eventLog = new EventLog(0, user, new Date(),"Login", "Id" + user.getId() + "- Nome" + user.getName() + " - Email" + user.getEmail());
                eventLogService.create(eventLog);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(user);
            }

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário não encontrado!");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
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

                EventLog eventLog = new EventLog(0, user, new Date(),"Registro", "Id" + user.getId() + "- Nome" + user.getName() + " - Email" + user.getEmail());
                eventLogService.create(eventLog);

                return ResponseEntity.status(HttpStatus.CREATED).body(user);
            }

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário Já Cadastrado");
        }
        catch (RuntimeException runtimeException){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(runtimeException);
        }
    }

    public ResponseEntity updateAnnotation(List<Annotation> annotations, String idUser){
        try {
            Optional<User> user = userRepository.findById(idUser);
            Map<String, Object> response = new HashMap<>();

            if(user.isEmpty()){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário não encontrado!");
            }
            user.get().setAnnotations(annotations);
            UserDTO userDTO = new UserDTO(user.get().getId(), user.get().getAnnotations(), user.get().getRole());
            response.put("user", userDTO);
            response.put("status", "Página atualizada com sucesso!");

            userRepository.save((User) user.get());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        } catch (RuntimeException runtimeException){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(runtimeException);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUser(username);
    }
}
