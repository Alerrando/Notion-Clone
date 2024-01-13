package com.example.notion.services;

import com.example.notion.entities.Annotation;
import com.example.notion.entities.User;
import com.example.notion.entities.UserDTO;
import com.example.notion.repositorys.UserRepository;
import com.example.notion.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AnnotationService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    Util util;

    public ResponseEntity create(Annotation annotation){
        try {
            Optional<User> user = userRepository.findById(util.getIdUserCookie());
            Map<String, Object> response = new HashMap<>();

            if(user.isEmpty()){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário não encontrado!");
            }

            user.get().getAnnotations().add(annotation);
            UserDTO userDTO = new UserDTO(user.get().getAnnotations(), user.get().getRole());
            response.put("user", userDTO);
            response.put("status", "Página adicionada com sucesso!");

            userRepository.save((User) user.get());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        } catch (RuntimeException runtimeException){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(runtimeException);
        }
    }

    public ResponseEntity update(List<Annotation> annotations){
        try {
            Optional<User> user = userRepository.findById(util.getIdUserCookie());
            Map<String, Object> response = new HashMap<>();

            if(user.isEmpty()){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário não encontrado!");
            }
            user.get().setAnnotations(annotations);
            UserDTO userDTO = new UserDTO(user.get().getAnnotations(), user.get().getRole());
            response.put("user", userDTO);
            response.put("status", "Página atualizada com sucesso!");

            userRepository.save(user.get());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        } catch (RuntimeException runtimeException){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(runtimeException);
        }
    }
}
