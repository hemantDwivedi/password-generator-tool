import { randomInt } from "crypto";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const SPECIAL = "~`!@#$%^&*()-_=+\\|[{]};:'\",<.>/?";

const MAX_PASSWORD_LENGTH = 128;

export function generatePassword({
  capitalAlphabet,
  smallAlphabet,
  number,
  specialCharacter,
  passwordLength,
}) {
  let charset = "";
  if (capitalAlphabet) charset += UPPER;
  if (smallAlphabet) charset += LOWER;
  if (number) charset += DIGITS;
  if (specialCharacter) charset += SPECIAL;

  if (!charset) {
    throw new Error("At least one character type must be selected");
  }

  const length = Number(passwordLength);
  if (!Number.isInteger(length) || length < 1 || length > MAX_PASSWORD_LENGTH) {
    throw new Error(`passwordLength must be an integer between 1 and ${MAX_PASSWORD_LENGTH}`);
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset[randomInt(charset.length)];
  }
  return password;
}

export function generateSuggestedPassword() {
  const length = randomInt(16, 24);
  return generatePassword({
    capitalAlphabet: true,
    smallAlphabet: true,
    number: true,
    specialCharacter: true,
    passwordLength: length,
  });
}

export function verifyPasswordStrength(password) {
  let numberPresent = false;
  let upperCasePresent = false;
  let lowerCasePresent = false;
  let specialCharacterPresent = false;
  const minLength = password.length >= 8;

  for (const char of password) {
    if (/[0-9]/.test(char)) numberPresent = true;
    else if (/[A-Z]/.test(char)) upperCasePresent = true;
    else if (/[a-z]/.test(char)) lowerCasePresent = true;
    else if (SPECIAL.includes(char)) specialCharacterPresent = true;
  }

  if (numberPresent && upperCasePresent && lowerCasePresent && specialCharacterPresent && minLength) {
    return "very strong";
  }
  if (minLength && upperCasePresent && lowerCasePresent && (numberPresent || specialCharacterPresent)) {
    return "strong";
  }
  if (minLength && ((upperCasePresent && lowerCasePresent) || numberPresent || specialCharacterPresent)) {
    return "good";
  }
  return "poor";
}
