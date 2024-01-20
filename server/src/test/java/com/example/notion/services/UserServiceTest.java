package com.example.notion.services;

import com.example.notion.Enum.UserRole;
import com.example.notion.entities.*;
import com.example.notion.exception.UserNotFoundException;
import com.example.notion.repository.UserRepositoryTest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class UserServiceTest {
    @Mock
    UserRepositoryTest userRepository;

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
    @DisplayName("Should throw UserNotFoundException when user is not found")
    void findUserCase2() {
        try {
            AuthenticationDTO authenticationDTO = new AuthenticationDTO("nonexistent@example.com", "password");
            when(userRepository.findUser(authenticationDTO.getEmail())).thenReturn(null);

            userService.login(authenticationDTO);

        } catch(UserNotFoundException e){
            Assertions.assertEquals("Usuário não encontrado", e.getMessage());
        }
    }

}
