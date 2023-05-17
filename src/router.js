import { Router } from "express";
import authRouter from "./api/auth/routes.js";
import usersRouter from "./api/users/routes.js";
import projectRouter from "./api/projects/routes.js";

const router = Router();

// Load routers
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/projects', projectRouter);

export default router;
