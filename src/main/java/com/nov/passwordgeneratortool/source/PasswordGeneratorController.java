package com.nov.passwordgeneratortool.source;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class PasswordGeneratorController {
    private static final Logger logger = LoggerFactory.getLogger(PasswordGeneratorController.class);

    private PasswordGeneratorService passwordGeneratorService;
    @PostMapping
    public String generatePassword(@RequestBody Characters characters){
        return passwordGeneratorService.generatePassword(characters);
    }

    @PostMapping("/mail")
    public void sendToEmail(@RequestBody SentMail sentMail){
        passwordGeneratorService.sentToMail(sentMail);
    }
}
