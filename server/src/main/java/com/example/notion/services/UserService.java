package com.example.notion.services;

import com.example.notion.entities.Annotation;
import com.example.notion.entities.AuthenticationDTO;
import com.example.notion.entities.EventLog;
import com.example.notion.entities.User;
import com.example.notion.repositorys.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
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
    private AuthenticationManager authenticationManager;

    @Autowired
    private EventLogService eventLogService;


    public List<User> findAll(){
        return userRepository.findAll();
    }

    public ResponseEntity findUser(AuthenticationDTO authenticationDTO) {
        try {
            Map<String, Object> response = new HashMap<>();
            User user = (User) userRepository.findUser(authenticationDTO.email());
            if(user.getEmail().equals(authenticationDTO.email())){
                var userEmailPassword = new UsernamePasswordAuthenticationToken(authenticationDTO.email(), authenticationDTO.password());
                var auth = this.authenticationManager.authenticate(userEmailPassword);
                var token = tokenService.generateToken((User) auth.getPrincipal());

                response.put("token", token);
                response.put("user", user);

                EventLog eventLog = new EventLog(user, new Date(),"Login", "Id" + user.getId() + "- Nome" + user.getName() + " - Email" + user.getEmail());
                eventLogService.create(eventLog);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
            }

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário não encontrado!");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }

    }

    public ResponseEntity create(@Valid User user){
        try {
            User optional = (User) userRepository.findUser(user.getEmail());
            Map<String, Object> response = new HashMap<>();
            if(optional == null || optional.equals(user)){
                String encryptedPassword = new BCryptPasswordEncoder().encode(user.getPassword());
                user.setPassword(encryptedPassword);
                user.setId(UUID.randomUUID().toString());
                var token = tokenService.generateToken(user);

                response.put("token", token);
                response.put("user", user);
                userRepository.save(user);

                EventLog eventLog = new EventLog(user, new Date(),"Registro", "Id" + user.getId() + "- Nome" + user.getName() + " - Email" + user.getEmail());
                eventLogService.create(eventLog);

                return ResponseEntity.status(HttpStatus.CREATED).body(response);
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

            response.put("user", user.get());
            response.put("status", "Página atualizada com sucesso!");

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
