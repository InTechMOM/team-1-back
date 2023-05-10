import { Router } from "express";
import authRouter from "./api/auth/routes.js";
import usersRouter from "./api/users/routes.js";
import videoRouter from "./api/videos/routes.js";

const router = Router();

// Load routers
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/videos', videoRouter);

export default router;
