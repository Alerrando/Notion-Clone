package com.example.notion.repository;

import com.example.notion.entities.User;
import com.example.notion.repositorys.UserRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

public abstract class UserRepositoryTest implements UserRepository {
    @Override
    public UserDetails findUser(String email) {
        return null;
    }

    @Override
    public Optional<User> findById(String id) {
        return Optional.empty();
    }

    @Override
    public <S extends User> S save(S entity) {
        return null;
    }

    @Override
    public List<User> findAll() {
        return null;
    }

    @Override
    public void deleteById(Integer integer) {

    }

    @Override
    public void delete(User entity) {

    }
}
