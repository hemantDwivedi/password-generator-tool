package com.nov.passwordgeneratortool.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SentMail {
    private String recipientName;
    private String recipientEmail;
    private String password;
}
