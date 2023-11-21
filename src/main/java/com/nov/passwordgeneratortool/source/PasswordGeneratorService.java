package com.nov.passwordgeneratortool.source;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class PasswordGeneratorService {

    Logger logger = LoggerFactory.getLogger(getClass());
    private static char[] storePassword;
    private static String passwordString = "";

    String generatePassword(Characters characters) {


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
        logger.info("final string {} and length is {}", passwordString, passwordString.length());

        // Set length of password user's required
        storePassword = new char[characters.getPasswordLength()];
        logger.info("User required Password length {}", storePassword.length);

        // Get random character from 'passwordString' and store it into 'storePassword'
        for (int i = 0; i < storePassword.length; i++) {
            int randomNum = getRandomIntegerValue();
            logger.info("Random Integer value {}", randomNum);

            storePassword[i] = passwordString.charAt(randomNum);
        }

        logger.info("Generated Password {}", storePassword.toString());
        return storePassword.toString();
    }

    private int getRandomIntegerValue() {
        Random random = new Random();
        int length = passwordString.length();

        return random.nextInt(length);
    }
}
