import express from "express";
import Joi from 'joi';
import { createValidator } from 'express-joi-validation'

import User from "../../models/users.js";

const router = express.Router();
const validator = createValidator();

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  rol: Joi.string().valid('teacher','student').required(),
})

router.post('/', validator.body(userSchema), async (request, response) => {
  const newUser = new User({ ...request.body });
  const user = await newUser.save();
  return response.status(201).json(user); 
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  const user = await User.findById(id);
  if (user != null) {
    return response.status(200).json(user);
  } else {
    return response.status(404).json({menssage: "User not found"});
  }
})

router.put("/:id", validator.body(userSchema), async (request, response) => {
  const { id } = request.params;
  const updatedUser = await User.findByIdAndUpdate(id , request.body);
  return response.status(200).json(updatedUser);
});

router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const deletedUser = await User.findByIdAndDelete(id);
  return response.status(200).json(deletedUser);
});

export default router;