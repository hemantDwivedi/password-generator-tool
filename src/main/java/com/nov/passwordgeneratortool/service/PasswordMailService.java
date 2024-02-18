package com.nov.passwordgeneratortool.service;

import com.nov.passwordgeneratortool.model.SentMail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class PasswordMailService {

    Logger logger = LoggerFactory.getLogger(PasswordMailService.class);

    // Sending mail service project link: https://github.com/hemantDwivedi/mail-sending-service
    public void sendingMail(SentMail sentMail) {
        if (sentMail.getRecipientEmail() == null && sentMail.getPassword() == null)
            throw new RuntimeException("sentMail data is null");
        String message = "Your Master Key: " + sentMail.getPassword();

        sentMail.setPassword(message);

        RestTemplate restTemplate = new RestTemplate();

        String res = restTemplate.postForObject(
                "http://localhost:8000/api/v1/mail",
                sentMail,
                String.class
        );

        logger.info("Is mail sent successfully? {} ", (res != null && res.isEmpty()) ? "No" : "Yes");
    }
}
