package com.nov.passwordgeneratortool.source;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
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
        logger.info("printing payload {}", characters.getCapitalAlphabet());
        return passwordGeneratorService.generatePassword(characters);
    }
}
