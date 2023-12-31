package com.nov.passwordgeneratortool.source;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Characters {
    private Boolean capitalAlphabet;
    private Boolean smallAlphabet;
    private Boolean number;
    private Boolean specialCharacter;
    private Integer passwordLength;
}
