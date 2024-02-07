package com.nov.passwordgeneratortool.source;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PasswordGeneratorServiceTest {

    @Autowired
    private PasswordGeneratorService service;

    @Test
    void test_generatePassword_AndLength() {
        Characters characters = getCharacters();
        String generatePassword = service.generatePassword(characters);

        assertEquals(10, generatePassword.length());
        assertNotNull(generatePassword);
    }

    @Test
    void test_generateVeryStrongPassword_ExpectedResult(){
        String genPassword = service.generateVeryStrongPassword(20);

        assertNotNull(genPassword);
        assertEquals(20, genPassword.length());
    }

    @Test
    void test_generateVeryStrongPassword_WithSmallLength_ExpectedResult(){
        String genPassword = service.generateVeryStrongPassword(9);

        assertNotNull(genPassword);
        assertNotEquals(9, genPassword.length());
    }

    @Test
    void test_strengthVerifier_ExpectedResult(){
        String result = service.strengthVerifier("5x-]@0H-%@k");

        String expected = "very strong";
        assertNotNull(result);
        assertEquals(expected, result);
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