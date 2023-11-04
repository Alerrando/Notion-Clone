package com.example.notion.repositorys;

import com.example.notion.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, Integer> {
    @Query("{ 'email': ?0 }")
    Optional<User> findUser(@Param("email") String email);

    @Query("{ 'id': ?0 }")
    Optional<User> findById(@Param("id") Integer id);
}
