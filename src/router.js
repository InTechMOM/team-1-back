import { Router } from "express";
import usersRouter from "./api/users/routes.js";

const router = Router();

// Load routers
router.use('/users', usersRouter);

export default router;
