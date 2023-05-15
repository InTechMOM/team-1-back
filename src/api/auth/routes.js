import express from "express";
import { login } from "./controllers.js";
import validateRequest from "./validate.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for basic login
 * 
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: user email.
 *                 example: cltazz@email.com
 *               rol:
 *                 type: string
 *                 description: user rol. Should by "student" or "teacher"
 *                 example: student
 *     responses:
 *       200:
 *         description: Login ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: User not authorized
 */


router.post('/login', validateRequest, login);

export default router;