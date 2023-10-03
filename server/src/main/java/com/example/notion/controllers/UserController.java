package com.example.notion.controllers;

import com.example.notion.entities.User;
import com.example.notion.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/find/{email}/{password}")
    public ResponseEntity<Object> findUser(@PathVariable String email, @PathVariable String password){
        return userService.findUser(email, password);
    }

    @PostMapping
    public User create(@RequestBody User user){
        return userService.create(user);
    }
}
