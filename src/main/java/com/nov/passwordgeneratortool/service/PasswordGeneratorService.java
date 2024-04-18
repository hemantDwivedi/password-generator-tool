package com.nov.passwordgeneratortool.service;

import com.nov.passwordgeneratortool.model.Characters;
import com.nov.passwordgeneratortool.model.Password;
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

    public String generateSuggestPassword() {
        return generatePassword(getCharacters(getRandomIntegerValue()));
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

    public String strengthVerifier(Password password) {
        String passwordString = password.getCheckPassword();
        String specialChars = "~`!@#$%^&*()-_=+\\|[{]};:'\",<.>/?";
        boolean numberPresent = false;
        boolean upperCasePresent = false;
        boolean lowerCasePresent = false;
        boolean specialCharacterPresent = false;
        boolean minLength = passwordString.length() >= 8;

        for (int i = 0; i < passwordString.length(); i++) {
            char currentCharacter = passwordString.charAt(i);
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
        return random.nextInt(16, 24);
    }
}
