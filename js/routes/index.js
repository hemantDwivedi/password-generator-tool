import express from 'express';
import { passwordStrengthVerifier, generatePasswordApi, sentMailApi, suggestPasswordApi } from '../Controller/index.js'

const route = express.Router();

route.post("/passwordStrengthVerifier", passwordStrengthVerifier)
route.post("/generatePasswordApi", generatePasswordApi)
route.post("/sentMailApi", sentMailApi)
route.post("/suggestPasswordApi", suggestPasswordApi)
export default route;

