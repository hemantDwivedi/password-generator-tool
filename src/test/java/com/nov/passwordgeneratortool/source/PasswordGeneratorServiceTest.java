package com.nov.passwordgeneratortool.source;

import com.nov.passwordgeneratortool.model.Characters;
import com.nov.passwordgeneratortool.model.Password;
import com.nov.passwordgeneratortool.service.PasswordGeneratorService;
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
    void test_generateVeryStrongPassword_WithSmallLength_ExpectedResult(){
        String genPassword = service.generateSuggestPassword();
        assertNotNull(genPassword);
    }

    @Test
    void test_strengthVerifier_ExpectedResult(){
        String result = service.strengthVerifier(new Password("5x-]@0H-%@k"));

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