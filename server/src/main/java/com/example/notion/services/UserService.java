package com.example.notion.services;

import com.example.notion.entities.User;
import com.example.notion.repositorys.UserMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserMongoRepository userMongoRepository;

    @Autowired
    public UserService(UserMongoRepository userMongoRepository) {
        this.userMongoRepository = userMongoRepository;
    }

    public List<User> findAll(){
        return userMongoRepository.findAll();
    }
}
