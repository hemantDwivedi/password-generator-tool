package com.nov.passwordgeneratortool.service;

import com.nov.passwordgeneratortool.model.Characters;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class PasswordGeneratorService {

    Logger logger = LoggerFactory.getLogger(getClass());

    public String generatePassword(Characters characters) {
        StringBuilder charactersString = new StringBuilder();
        StringBuilder finalPassword = new StringBuilder();

        String specialCharacters = "!@#$%^&*()-_+={}[]|\\:;\"'<>,.?/";
        String capitalAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String smallAlphabets = "abcdefghijklmnopqrstuvwxyz";
        String numbers = "1234567890";

        if (characters.getCapitalAlphabet()) charactersString.append(capitalAlphabets);
        if (characters.getSmallAlphabet()) charactersString.append(smallAlphabets);
        if (characters.getNumber()) charactersString.append(numbers);
        if (characters.getSpecialCharacter()) charactersString.append(specialCharacters);

        for (int i = 1; i <= characters.getPasswordLength(); i++) {
            int randomNum = getRandomIntegerValue(charactersString.toString());
            finalPassword.append(charactersString.charAt(randomNum));
        }
        return finalPassword.toString();
    }

    public String generateSuggestPassword(int passwordLength) {
        if (passwordLength < 12) passwordLength = getRandomIntegerValue();
        return generatePassword(getCharacters(passwordLength));
    }


    public String strengthVerifier(String password) {
        return getPasswordStrength(password);
    }

    private Characters getCharacters(int passwordLength) {
        return Characters
                .builder()
                .capitalAlphabet(true)
                .smallAlphabet(true)
                .number(true)
                .specialCharacter(true)
                .passwordLength(passwordLength)
                .build();
    }

    private String getPasswordStrength(String password) {
        String specialChars = "~`!@#$%^&*()-_=+\\|[{]};:'\",<.>/?";
        char currentCharacter;
        boolean numberPresent = false;
        boolean upperCasePresent = false;
        boolean lowerCasePresent = false;
        boolean specialCharacterPresent = false;
        boolean minLength = password.length() >= 8;

        for (int i = 0; i < password.length(); i++) {
            currentCharacter = password.charAt(i);
            if (Character.isDigit(currentCharacter)) {
                numberPresent = true;
            } else if (Character.isUpperCase(currentCharacter)) {
                upperCasePresent = true;
            } else if (Character.isLowerCase(currentCharacter)) {
                lowerCasePresent = true;
            } else if (specialChars.contains(String.valueOf(currentCharacter))) {
                specialCharacterPresent = true;
            }
        }

        if (numberPresent && upperCasePresent && lowerCasePresent && specialCharacterPresent && minLength)
            return "very strong";
        else if (minLength && (upperCasePresent && lowerCasePresent) && (numberPresent || specialCharacterPresent))
            return "strong";
        else if (minLength && ((upperCasePresent && lowerCasePresent) || (numberPresent || specialCharacterPresent)))
            return "good";
        return "poor";
    }

    private int getRandomIntegerValue(String charactersString) {
        Random random = new Random();
        int length = charactersString.length();
        return random.nextInt(length);
    }

    private int getRandomIntegerValue() {
        Random random = new Random();
        return random.nextInt(12, 24);
    }
}
