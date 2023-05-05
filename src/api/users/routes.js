import express from "express";

import validateRequest from "./validate.js";
import { createUser, getUser, putUser, deleteUser } from "./controllers.js";

const router = express.Router();

router.post('/', validateRequest, createUser);

router.get("/:id", getUser);

router.put("/:id", validateRequest, putUser); 

router.delete("/:id", deleteUser);

export default router;