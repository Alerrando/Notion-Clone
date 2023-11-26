package com.example.notion.controllers;

import com.example.notion.entities.Annotation;
import com.example.notion.entities.AuthenticationDTO;
import com.example.notion.entities.User;
import com.example.notion.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @PostMapping("/find")
    public ResponseEntity findUser(@RequestBody @Valid AuthenticationDTO authenticationDTO){
        return userService.findUser(authenticationDTO);
    }

    @PostMapping
    public ResponseEntity create(@RequestBody @Valid User user){
        return userService.create(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateAnnotation(@RequestBody List<Annotation> annotations, @PathVariable String id){
        return userService.updateAnnotation(annotations, id);
    }
}
