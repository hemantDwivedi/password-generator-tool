package com.nov.passwordgeneratortool.source;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class PasswordGeneratorController {

    private PasswordGeneratorService passwordGeneratorService;
    @PostMapping
    public String generatePassword(@RequestBody Characters characters){
        System.out.println(characters.getPasswordLength());
        return passwordGeneratorService.generatePassword(characters);
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
