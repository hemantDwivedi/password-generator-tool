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

        for (int i = 1; i <= characters.getPasswordLength(); i++) {
            int randomNum = getRandomIntegerValue(charactersString);

            storePassword += String.valueOf(charactersString.charAt(randomNum));
        }
        return storePassword;
    }
    
    public String generateVeryStrongPassword(int passwordLength) {
    	String charactersString = "!@#$%^&*()-_+={}[]|\\:;\"'<>,.?/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        String storePassword = "";

        if(passwordLength < 12 ) passwordLength = getRandomIntegerValueInRange(12, 24);
        
        for (int i = 1; i <= passwordLength; i++) {
            int randomNum = getRandomIntegerValue(charactersString);

            storePassword += String.valueOf(charactersString.charAt(randomNum));
        }
        return storePassword;
        
    }

    public String strengthVerifier(String password) {
         return getPasswordStrength(password);
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

    // Sending mail service project link: https://github.com/hemantDwivedi/mail-sending-service
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
    
    private int getRandomIntegerValueInRange(int min,int max) {
        int length = (int)(Math.random()*((max-min)+1))+min;
        return length;
    }
}
