package com.nov.passwordgeneratortool.controller;

import com.nov.passwordgeneratortool.model.Characters;
import com.nov.passwordgeneratortool.model.SentMail;
import com.nov.passwordgeneratortool.service.PasswordGeneratorService;
import com.nov.passwordgeneratortool.service.PasswordMailService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class PasswordGeneratorController {

    private final PasswordGeneratorService passwordGeneratorService;
    private final PasswordMailService mailService;

    public PasswordGeneratorController(PasswordGeneratorService passwordGeneratorService, PasswordMailService mailService) {
        this.passwordGeneratorService = passwordGeneratorService;
        this.mailService = mailService;
    }

    @PostMapping
    public String generatePassword(@RequestBody Characters characters){
        return passwordGeneratorService.generatePassword(characters);
    }
    
    @PostMapping("/suggest")
    public String generateVeryStrongPassword(@RequestParam(value="passwordLength") int passwordLength) {
    	return passwordGeneratorService.generateSuggestPassword(passwordLength);
    }

    @PostMapping("/verifier")
    public String strengthVerifier(@RequestParam(value = "password") String password){
        return passwordGeneratorService.strengthVerifier(password);
    }

    @PostMapping("/mail")
    public void sendToEmail(@RequestBody SentMail sentMail){
        mailService.sendingMail(sentMail);
    }
}
