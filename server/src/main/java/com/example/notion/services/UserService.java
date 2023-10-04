package com.example.notion.services;

import com.example.notion.entities.User;
import com.example.notion.repositorys.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public ResponseEntity<Object> findUser(String email, String password){
        Optional<User> optional = userRepository.findUser(email);
        Map<String, Object> response = new HashMap<>();
        User user = optional.get();


        if(!optional.isEmpty() && user.getPassword().equals(password)){
            response.put("usuario", optional.get());
            return ResponseEntity.ok().body(response);
        }

        return ResponseEntity.notFound().build();
    }

    public User create(User user){
        return userRepository.save(user);
    }
}
