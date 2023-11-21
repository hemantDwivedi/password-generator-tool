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

        String specialCharactersArray = "!@#$%^&*()-_+={}[]|\\:;\"'<>,.?/";
        String capitalAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String smallAlphabets = "abcdefghijklmnopqrstuvwxyz";
        String numbers = "1234567890";

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
        return null;
    }

    private int getRandomIntegerValue() {
        Random random = new Random();

        return 0;
    }
}
