package com.nov.passwordgeneratortool.source;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class PasswordGeneratorServiceTest {

    @Autowired private PasswordGeneratorService service;

    @Test
    void test_generatePassword_length(){
        Characters characters = getCharacters();
        String generatePassword = service.generatePassword(characters);

        assertEquals(10, generatePassword.length());
    }

    @Test
    void test_generatePassword_includedAllCharacters_andExpectedLength(){
        Characters characters = getCharacters();


        String generatePassword = service.generatePassword(characters);

        boolean matches = Pattern.matches("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$", generatePassword);

        assertEquals(true, matches);
    }

    private static Characters getCharacters() {
        return new Characters(
                true,
                true,
                true,
                true,
                10
        );
    }
}