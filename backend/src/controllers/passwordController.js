import {
  generatePassword,
  generateSuggestedPassword,
  verifyPasswordStrength,
} from "../services/passwordService.js";

export function generatePasswordApi(req, res) {
  const { capitalAlphabet, smallAlphabet, number, specialCharacter, passwordLength } = req.body;
  try {
    const password = generatePassword({
      capitalAlphabet,
      smallAlphabet,
      number,
      specialCharacter,
      passwordLength,
    });
    res.json(password);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export function suggestPasswordApi(req, res) {
  res.json(generateSuggestedPassword());
}

export function passwordStrengthApi(req, res) {
  const { checkPassword } = req.body;
  if (typeof checkPassword !== "string" || checkPassword.length === 0) {
    return res.status(400).json({ error: "checkPassword is required" });
  }
  res.json(verifyPasswordStrength(checkPassword));
}
