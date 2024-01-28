package com.nov.passwordgeneratortool.source;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class PasswordGeneratorServiceTest {

    @Autowired private PasswordGeneratorService service;

    @Test
    void test_generatePassword_length(){
        Characters characters = getCharacters();
        String generatePassword = service.generatePassword(characters);

        assertEquals(10, generatePassword.length());
        assertNotNull(generatePassword);
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