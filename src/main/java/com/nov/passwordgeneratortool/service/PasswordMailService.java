package com.nov.passwordgeneratortool.service;

import com.nov.passwordgeneratortool.model.Mail;
import com.nov.passwordgeneratortool.model.MailRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class PasswordMailService {

    Logger logger = LoggerFactory.getLogger(PasswordMailService.class);

    // Sending mail service project link: https://github.com/hemantDwivedi/mail-sending-service
    public void sendingMail(MailRequest mailRequest) {
        Mail mail = getMail(mailRequest);

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Mail> entity = new HttpEntity<>(mail, httpHeaders);

        String res = restTemplate.postForObject(
                "http://localhost:8000/api/v1/mail",
                entity,
                String.class
        );

        logger.info("Is mail sent successfully? {} ", (res != null && res.isEmpty()) ? "No" : "Yes");
    }

    private static Mail getMail(MailRequest mailRequest) {
        String message = "Dear " + mailRequest.getName() + ",\n\n"
                + "Your new password has been generated successfully. Please find your password below:.\n\n"
                + "Password: " + mailRequest.getPassword() + "\n\n"
                + "If you have any questions or need further assistance, please feel free to contact us.\n\n"
                + "Best regards,\n"
                + "DeviansVilla";


        return new Mail(mailRequest.getEmail(), message);
    }
}
