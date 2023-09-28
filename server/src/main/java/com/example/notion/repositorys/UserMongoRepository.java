package com.example.notion.repositorys;

import com.example.notion.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserMongoRepository extends MongoRepository<User, Integer> {
}
