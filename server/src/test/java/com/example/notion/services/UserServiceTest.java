package com.example.notion.services;

import com.example.notion.Enum.UserRole;
import com.example.notion.entities.*;
import com.example.notion.exception.UserNotFoundException;
import com.example.notion.repositorys.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.mockito.Mockito.*;

public class UserServiceTest {
    @Mock
    UserRepository userRepository;

    @Mock
    private UserService userService;

    @Mock
    EventLogService eventLogService;

    @Mock
    TokenService tokenService;

    @BeforeEach
    void setup(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    @DisplayName("Should verify if user exist or no")
    void findUserCase1(){
        List<Annotation> annotations = new ArrayList<>();
        User user = new User("b2eb849a-29ba-4468-9011-c383229cf5b8", "Alerrando Breno", "alerrando2@gmail.com", "$2a$10$giYQY1rKP1zgNgMEAolu9uu9Hyv9nwwULtvN4CNBL0cSTJtmHGzFm", UserRole.ADMIN, annotations);

        when(userRepository.findUser(user.getEmail())).thenReturn(user);

        AuthenticationDTO authenticationDTO = new AuthenticationDTO("", "");
        tokenService.generateToken(authenticationDTO);
    }

    @Test
    @DisplayName("Should throw Exception when findById does not meet user")
    void findUserCase2() throws UserNotFoundException{
        List<Annotation> annotations = new ArrayList<>();
        User user = new User("b2eb849a-29ba-4468-9011-c383229cf5b8", "Alerrando Breno", "alerrando22@gmail.com", "$2a$10$giYQY1rKP1zgNgMEAolu9uu9Hyv9nwwULtvN4CNBL0cSTJtmHGzFm", UserRole.ADMIN, annotations);

        when(userRepository.findUser(user.getEmail())).thenReturn(null);

        Exception thrown = Assertions.assertThrows(UserNotFoundException.class, () -> {
            AuthenticationDTO authenticationDTO = new AuthenticationDTO("", "");
            userService.findUser(authenticationDTO);
        });

        Assertions.assertEquals("Usuário não encontrado", thrown.getMessage());
    }
}
