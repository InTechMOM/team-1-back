import express from "express";

import { createValidateRequest, updateValidateRequest } from "./validate.js";
import { createUser, getUser, putUser, deleteUser } from "./controllers.js";

const router = express.Router();

router.post('/', createValidateRequest, createUser);

router.get("/:id", getUser);

router.put("/:id", updateValidateRequest, putUser); 

router.delete("/:id", deleteUser);

export default router;