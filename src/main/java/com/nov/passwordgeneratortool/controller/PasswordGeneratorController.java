package com.nov.passwordgeneratortool.controller;

import com.nov.passwordgeneratortool.model.Characters;
import com.nov.passwordgeneratortool.model.Password;
import com.nov.passwordgeneratortool.model.MailRequest;
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
    public String generateVeryStrongPassword() {
    	return passwordGeneratorService.generateSuggestPassword();
    }

    @PostMapping("/verifier")
    public String strengthVerifier(@RequestBody Password password){
        return passwordGeneratorService.strengthVerifier(password);
    }

    @PostMapping("/mail")
    public void sendToEmail(@RequestBody MailRequest mailRequest){
        mailService.sendingMail(mailRequest);
    }
}
