import express from "express";

import { createValidateRequest, updateValidateRequest } from "./validate.js";
import { createProject, getProject, editProject, deleteProject } from "./controllers.js";

const router = express.Router();

router.post('/', createValidateRequest, createProject);

router.get("/:id", getProject);

router.put("/:id", updateValidateRequest, editProject); 

router.delete("/:id", deleteProject);

export default router;