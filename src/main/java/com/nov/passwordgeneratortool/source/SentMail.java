package com.nov.passwordgeneratortool.source;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SentMail {
    private String targetEmail;
    private String message;
}
