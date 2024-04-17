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
        String message = "<html>\n" +
                "<body>\n" +
                "    <h2>Dear " + sentMail.getRecipientName() + ",</h2>\n" +
                "    <p>Your new password has been generated successfully. Please find it below:</p>\n" +
                "    <table border=\"1\">\n" +
                "        <tr>\n" +
                "            <th>Password:</th>\n" +
                "            <td>" + sentMail.getPassword() + "</td>\n" +
                "        </tr>\n" +
                "    </table>\n" +
                "    <p>For security reasons, we recommend changing this password after logging in.</p>\n" +
                "    <p>Regards,<br>\n" +
                "    DeviansVilla</p>\n" +
                "</body>\n" +
                "</html>";

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
