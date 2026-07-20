import axios from "axios";

const apiUrl = "http://localhost:5000/"

export const generatePasswordApi = (characters) => axios.post(apiUrl, characters)

export const passwordStrengthVerifier = (password) => axios.post(apiUrl + 'verifier', password)

export const suggestPasswordApi = () => axios.post(apiUrl+'suggest')