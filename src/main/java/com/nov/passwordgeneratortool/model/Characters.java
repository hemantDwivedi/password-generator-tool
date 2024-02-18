package com.nov.passwordgeneratortool.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Characters {
    private Boolean capitalAlphabet;
    private Boolean smallAlphabet;
    private Boolean number;
    private Boolean specialCharacter;
    private Integer passwordLength;
}
