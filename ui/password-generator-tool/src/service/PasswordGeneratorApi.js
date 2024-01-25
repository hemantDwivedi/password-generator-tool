import axios from "axios";

const apiUrl = "http://localhost:8080/"

export const generatePasswordApi = (characters) => axios.post(apiUrl, characters)

export const sentMailApi = (requestData) => axios.post(apiUrl + 'mail', requestData)