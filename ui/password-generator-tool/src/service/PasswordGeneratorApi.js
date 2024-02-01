import axios from "axios";

const apiUrl = "http://localhost:8080/"

export const generatePasswordApi = (characters) => axios.post(apiUrl, characters)

export const passwordStrengthVerifier = (password) => axios.post(apiUrl + 'verifier?password=' + password)

export const sentMailApi = (requestData) => axios.post(apiUrl + 'mail', requestData)