import express from "express";
import { login } from "./controllers.js";
import validateRequest from "./validate.js";

const router = express.Router();

router.post('/', validateRequest, login);

export default router;