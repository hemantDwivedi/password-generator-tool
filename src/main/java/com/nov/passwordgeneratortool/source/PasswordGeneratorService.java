package com.nov.passwordgeneratortool.source;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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


        if (characters.getCapitalAlphabet()) {
            passwordString += capitalAlphabets;
        }

        if (characters.getSmallAlphabet()) {
            passwordString += smallAlphabets;
        }

        if (characters.getNumber()) {
            passwordString += numbers;
        }

        if (characters.getSpecialCharacter()) {
            passwordString += specialCharactersArray;
        }

        for (int i = 0; i < characters.getPasswordLength(); i++) {
            int randomNum = getRandomIntegerValue();

            storePassword += String.valueOf(passwordString.charAt(randomNum));
        }

        passwordString = "";
        return storePassword;
    }

    void sentToMail(SentMail sentMail){
        if (sentMail.getTargetEmail() == null && sentMail.getMessage() == null) throw new RuntimeException("sentMail data is null");
        String message = "Your Master Key\n" + sentMail.getMessage();

        sentMail.setMessage(message);

        RestTemplate restTemplate = new RestTemplate();

        String res = restTemplate.postForObject(
                "http://localhost:8000/api/v1/mail",
                sentMail,
                String.class
        );

        logger.info("Is mail sent successfully? {} ", (res != null && res.isEmpty()) ? "No" : "Yes");
    }

    private int getRandomIntegerValue() {
        Random random = new Random();
        int length = passwordString.length();
        return random.nextInt(length);
    }
}
