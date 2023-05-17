import express from "express";

import validateRequest from "./validate.js";
import { createProject, getProject, editProject, deleteProject } from "./controllers.js";

const router = express.Router();

router.post('/', validateRequest, createProject);

router.get("/:id", getProject);

router.put("/:id", validateRequest, editProject); 

router.delete("/:id", deleteProject);

export default router;