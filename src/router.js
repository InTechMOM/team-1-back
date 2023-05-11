import { Router } from "express";
import usersRouter from "./api/users/routes.js";
import authRouter from "./api/auth/routes.js";

const router = Router();

// Load routers
router.use('/users', usersRouter);
router.use('/auth', authRouter);

export default router;
