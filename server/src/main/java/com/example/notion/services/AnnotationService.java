package com.example.notion.services;

import com.example.notion.entities.Annotation;
import com.example.notion.entities.EventLog;
import com.example.notion.entities.User;
import com.example.notion.entities.UserDTO;
import com.example.notion.exception.UserNotFoundException;
import com.example.notion.repositorys.EventLogRepository;
import com.example.notion.repositorys.UserRepository;
import com.example.notion.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AnnotationService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    EventLogRepository eventLogRepository;

    @Autowired
    Util util;

    public void create(Annotation annotation){
            Optional<User> user = userRepository.findById(util.getIdUserCookie());
            Map<String, Object> response = new HashMap<>();

            if(user.isEmpty()){
                throw new UserNotFoundException();
            }

            user.get().getAnnotations().add(annotation);
            UserDTO userDTO = new UserDTO(user.get().getAnnotations(), user.get().getRole());
            response.put("user", userDTO);
            response.put("status", "Página adicionada com sucesso!");

            userRepository.save(user.get());
    }

    public ResponseEntity update(List<Annotation> annotations, String title){
        try {
            Optional<User> user = userRepository.findById(util.getIdUserCookie());
            Map<String, Object> response = new HashMap<>();

            if(user.isEmpty()){
                throw new UserNotFoundException();
            }

            user.get().setAnnotations(annotations);
            UserDTO userDTO = new UserDTO(user.get().getAnnotations(), user.get().getRole());

            eventLogRepository.save(new EventLog(0, user.get(), new Date(), "Editou a página ", "Página" + title + "foi editada"));
            response.put("user", userDTO);
            response.put("status", "Página atualizada com sucesso!");
            userRepository.save(user.get());

            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        } catch (RuntimeException runtimeException){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(runtimeException);
        }
    }
}
