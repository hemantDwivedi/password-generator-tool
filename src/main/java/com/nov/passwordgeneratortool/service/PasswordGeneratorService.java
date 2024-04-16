package com.nov.passwordgeneratortool.service;

import com.nov.passwordgeneratortool.model.Characters;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class PasswordGeneratorService {
    private final Random random = new Random();

    public String generatePassword(Characters characters) {
        StringBuilder charactersString = new StringBuilder();
        StringBuilder finalPassword = new StringBuilder();

        if (Boolean.TRUE.equals(characters.getCapitalAlphabet())) charactersString.append(new CharacterRule(EnglishCharacterData.UpperCase).getValidCharacters());
        if (Boolean.TRUE.equals(characters.getSmallAlphabet())) charactersString.append(new CharacterRule(EnglishCharacterData.LowerCase).getValidCharacters());
        if (Boolean.TRUE.equals(characters.getNumber())) charactersString.append(new CharacterRule(EnglishCharacterData.Digit).getValidCharacters());
        if (Boolean.TRUE.equals(characters.getSpecialCharacter())) charactersString.append(new CharacterRule(EnglishCharacterData.Special).getValidCharacters());

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

    public String strengthVerifier(String password) {
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
            }
            if (Character.isUpperCase(currentCharacter)) {
                upperCasePresent = true;
            }
            if (Character.isLowerCase(currentCharacter)) {
                lowerCasePresent = true;
            }
            if (specialChars.contains(String.valueOf(currentCharacter))) {
                specialCharacterPresent = true;
            }
        }
        
        return getPasswordStrength(numberPresent, upperCasePresent, lowerCasePresent, specialCharacterPresent, minLength);
    }

    private static String getPasswordStrength(boolean numberPresent, boolean upperCasePresent, boolean lowerCasePresent, boolean specialCharacterPresent, boolean minLength) {
        if (numberPresent && upperCasePresent && lowerCasePresent && specialCharacterPresent && minLength)
            return "very strong";
        else if (minLength && (upperCasePresent && lowerCasePresent) && (numberPresent || specialCharacterPresent))
            return "strong";
        else if (minLength && ((upperCasePresent && lowerCasePresent) || (numberPresent || specialCharacterPresent)))
            return "good";
        return "poor";
    }

    private int getRandomIntegerValue(String charactersString) {
        int length = charactersString.length();
        return random.nextInt(length);
    }

    private int getRandomIntegerValue() {
        return random.nextInt(12, 24);
    }
}
