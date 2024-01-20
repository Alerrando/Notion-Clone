package com.example.notion.controllers;

import com.example.notion.entities.Annotation;
import com.example.notion.entities.AuthenticationDTO;
import com.example.notion.entities.User;
import com.example.notion.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> findAll(){
        return userService.findAll();
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthenticationDTO authenticationDTO){
        return userService.login(authenticationDTO);
    }

    @PostMapping
    public ResponseEntity create(@RequestBody  User user){
        return userService.create(user);
    }
}
