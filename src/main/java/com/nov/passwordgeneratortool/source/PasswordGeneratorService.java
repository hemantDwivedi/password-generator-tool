package com.nov.passwordgeneratortool.source;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Random;

@Service
public class PasswordGeneratorService {

    Logger logger = LoggerFactory.getLogger(getClass());

    String generatePassword(Characters characters) {
        String charactersString = "";
        String storePassword = "";


        String specialCharactersArray = "!@#$%^&*()-_+={}[]|\\:;\"'<>,.?/";
        String capitalAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String smallAlphabets = "abcdefghijklmnopqrstuvwxyz";
        String numbers = "1234567890";


        if (characters.getCapitalAlphabet()) {
            charactersString += capitalAlphabets;
        }

        if (characters.getSmallAlphabet()) {
            charactersString += smallAlphabets;
        }

        if (characters.getNumber()) {
            charactersString += numbers;
        }

        if (characters.getSpecialCharacter()) {
            charactersString += specialCharactersArray;
        }

        for (int i = 1; i < characters.getPasswordLength(); i++) {
            int randomNum = getRandomIntegerValue(charactersString);
            System.out.println("random number: " + randomNum);

            storePassword += String.valueOf(charactersString.charAt(randomNum));
        }
        return storePassword;
    }

    void sentToMail(SentMail sentMail) {
        if (sentMail.getTargetEmail() == null && sentMail.getMessage() == null)
            throw new RuntimeException("sentMail data is null");
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

    private int getRandomIntegerValue(String charactersString) {
        Random random = new Random();
        int length = charactersString.length();
        return random.nextInt(length);
    }
}
