package com.nov.passwordgeneratortool.source;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class PasswordGeneratorController {
    private static final Logger logger = LoggerFactory.getLogger(PasswordGeneratorController.class);

    private PasswordGeneratorService passwordGeneratorService;
    @PostMapping
    public String generatePassword(@RequestBody Characters characters){
        return passwordGeneratorService.generatePassword(characters);
    }
    
    @PostMapping("/suggest")
    public String generateVeryStrongPassword(@RequestParam(value="passwordLength") int passwordLength) {
    	return passwordGeneratorService.generateVeryStrongPassword(passwordLength);
    }

    @PostMapping("/verifier")
    public String strengthVerifier(@RequestParam(value = "password") String password){
        return passwordGeneratorService.strengthVerifier(password);
    }

    @PostMapping("/mail")
    public void sendToEmail(@RequestBody SentMail sentMail){
        passwordGeneratorService.sentToMail(sentMail);
    }
}
