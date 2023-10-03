package com.example.notion.repositorys;

import com.example.notion.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, Integer> {
    @Query("{ email: email }")
    Optional<User> findUser(@Param("email") String email);
}
