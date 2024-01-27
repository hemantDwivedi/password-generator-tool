import java.util.Random;
import java.util.Scanner;

public class PasswordGeneratorCli {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        char userChoice = 'n';

        System.out.print("Enter Password Length: ");
        int passwordLength = scanner.nextInt();

        if (passwordLength < 8 || passwordLength > 24) {
            if (passwordLength < 8) System.out.println("Password length is too short.");
            if (passwordLength > 24) System.out.println("Passwrod length is too long.");
            System.out.println("Try (8 - 24)");
        } else {

            do {
                System.out.println(generatePassword(passwordLength));
                System.out.print("Generate again (y/n): ");
                userChoice = scanner.next().charAt(0);
            } while (userChoice == 'y' || userChoice == 'Y');
        }


        System.out.println();
        System.out.println("Thank you!");
    }

    public static String generatePassword(int length) {
        String storePassword = "";


        String characters = "!@#$%^&*()-_+={}[]|\\:;\"'<>,.?/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

        for (int i = 0; i < length; i++) {
            int randomNum = getRandomIntegerValue(characters.length());

            storePassword += String.valueOf(characters.charAt(randomNum));
        }

        return storePassword;
    }

    private static int getRandomIntegerValue(int charactersLength) {
        Random random = new Random();
        return random.nextInt(charactersLength);
    }
}
