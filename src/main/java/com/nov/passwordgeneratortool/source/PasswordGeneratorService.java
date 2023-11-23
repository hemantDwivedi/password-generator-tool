package com.nov.passwordgeneratortool.source;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class PasswordGeneratorService {

    Logger logger = LoggerFactory.getLogger(getClass());
    private static String passwordString = "";

    String generatePassword(Characters characters) {
        String storePassword = "";


        String specialCharactersArray = "!@#$%^&*()-_+={}[]|\\:;\"'<>,.?/";
        String capitalAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String smallAlphabets = "abcdefghijklmnopqrstuvwxyz";
        String numbers = "1234567890";

        // Check which characters combination password user wants

        if (characters.getCapitalAlphabet()) {
            passwordString += capitalAlphabets;
        }

        if (characters.getSmallAlphabet()) {
            passwordString += smallAlphabets;
        }

        if (characters.getNumbers()) {
            passwordString += numbers;
        }

        if (characters.getSpecialCharacters()) {
            passwordString += specialCharactersArray;
        }
        logger.info("final string: {} and Length:{}", passwordString, passwordString.length());

        // Get random character from 'passwordString' and store it into 'storePassword'
        for (int i = 0; i < characters.getPasswordLength(); i++) {
            int randomNum = getRandomIntegerValue();

            storePassword += String.valueOf(passwordString.charAt(randomNum));
        }

        logger.info("Generated Password {}", storePassword);

        passwordString = "";
        return storePassword;
    }

    private int getRandomIntegerValue() {
        Random random = new Random();
        int length = passwordString.length();
        return random.nextInt(length);
    }
}
