package com.nov.passwordgeneratortool.source;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class PasswordGeneratorController {
    private PasswordGeneratorService passwordGeneratorService;
    @PostMapping
    public ResponseEntity<String> generatePassword(@RequestBody Characters characters){
        return ResponseEntity.ok(passwordGeneratorService.generatePassword(characters));
    }
}
