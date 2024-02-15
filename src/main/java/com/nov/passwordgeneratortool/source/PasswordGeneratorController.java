package com.nov.passwordgeneratortool.source;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PasswordGeneratorController {

    private final PasswordGeneratorService passwordGeneratorService;

    public PasswordGeneratorController(PasswordGeneratorService passwordGeneratorService) {
        this.passwordGeneratorService = passwordGeneratorService;
    }

    @PostMapping
    public String generatePassword(@RequestBody Characters characters){
        return passwordGeneratorService.generatePassword(characters);
    }
    
    @PostMapping("/suggest")
    public String generateVeryStrongPassword(@RequestParam(value="passwordLength") int passwordLength) {
    	return passwordGeneratorService.generatePassword(passwordLength);
    }

    @PostMapping("/verifier")
    public String strengthVerifier(@RequestParam(value = "password") String password){
        return passwordGeneratorService.strengthVerifier(password);
    }

    @PostMapping("/mail")
    public void sendToEmail(@RequestBody SentMail sentMail){
        passwordGeneratorService.sendingMail(sentMail);
    }
}
