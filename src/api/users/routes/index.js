import express from "express";
import Joi from 'joi';
import { createValidator } from 'express-joi-validation'

import User from "../../../models/users.js";

const router = express.Router();
const validator = createValidator()

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  rol: Joi.string().valid('teacher','student').required(),
})

router.post('/', validator.body(userSchema), async (request, response, error) => {
  const newUser = new User({ ...request.body });
  const user = await newUser.save();
  return response.status(201).json(user); 
});

router.get('/', (request, response, error) => {
  response.send("hola desde /users")  
});

export default router;