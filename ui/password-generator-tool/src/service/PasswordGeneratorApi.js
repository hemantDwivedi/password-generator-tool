import axios from "axios";

const apiUrl = "http://localhost:5000/"
// const apiUrl = "http://Pgt-aws-server-env.eba-nj3vrmpc.ap-south-1.elasticbeanstalk.com/"

export const generatePasswordApi = (characters) => axios.post(apiUrl, characters)

export const passwordStrengthVerifier = (password) => axios.post(apiUrl + 'verifier', password)

export const sentMailApi = (requestData) => axios.post(apiUrl + 'mail', requestData)

export const suggestPasswordApi = () => axios.post(apiUrl+'suggest')