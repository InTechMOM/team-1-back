import express from "express";

import { createValidateRequest, updateValidateRequest } from "./validate.js";
import { createUser, getUser, putUser, deleteUser } from "./controllers.js";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     InvalidId:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 * 
 *     UserCreate:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - rol
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         rol:
 *           type: string
 *           enum: [student, teacher]
 *       example:
 *         firstName: Sheldon
 *         lastName: Cooper
 *         email: scooper@email.com
 *         rol: teacher
 * 
 *     UserUpdate:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *       example:
 *         firstName: Sheldon
 *         lastName: Cooper
 * 
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - rol
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated in MongoDb
 *         firstName:
 *           type: string
 *         lasName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         rol:
 *           type: string
 *           enum: [student, teacher]
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date was added
 *       example:
 *         _id: 645d02643996292600e6f837
 *         firstName: Sheldon
 *         lastName: Cooper
 *         email: scooper@email.com
 *         rol: teacher
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for users
 * 
 * /users/:
 *   post:
 *     summary: Create user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       200:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/', createValidateRequest, createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       201:
 *         description: User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User not found
 *       422: 
 *         description: Invalid Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidId'
 */
router.get("/:id", getUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: User update
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       422: 
 *         description: Invalid Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidId'
 */
router.put("/:id", updateValidateRequest, putUser); 

/**
* @swagger
* /users/{id}:
*   delete:
*     summary: Delete user
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The user id
*     responses:
*       200:
*         description: User deleted
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       404:
*         description: User not found
*       422: 
*         description: Invalid Id
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/InvalidId'
*/
router.delete("/:id", deleteUser);

export default router;