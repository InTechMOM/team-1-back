import express from "express";

import { createValidateRequest, updateValidateRequest } from "./validate.js";
import { createProject, getProject, uploadProject, deleteProject } from "./controllers.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ProjectCreate:
 *       type: object
 *       required:
 *         - studentEmail
 *         - teacherEmail
 *         - title
 *       properties:
 *         studentEmail:
 *           type: string
 *           format: email
 *         teacherEmail:
 *           type: string
 *           format: email
 *         title:
 *           type: string
 *       example:
 *         studentEmail: lhofstatter@email.com
 *         teacherEmail: scooper@email.com
 *         title: The Big Bang Theory
 * 
 *     ProjectUpdate:
 *       type: object
 *       properties:
 *         link1:
 *           type: string
 *           format: uri
 *         link2:
 *           type: string
 *           format: uri
 *         link3:
 *           type: string
 *           format: uri
 *       example:
 *          link1: http://ejemplo.com
 * 
 *     Project:
 *       type: object
 *       required:
 *         - student
 *         - teacher
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated in MongoDb
 *         student:
 *           $ref: '#/components/schemas/User'
 *         teacher:
 *           $ref: '#/components/schemas/User'
 *         title:
 *           type: string
 *         link1:
 *           type: string
 *           format: uri
 *         link2:
 *           type: string
 *           format: uri
 *         link3:
 *           type: string
 *           format: uri
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date was added
 *       example:
 *         _id: 645d02643996292600e6f837
 *         student: 
 *            _id: 645d02643996292600e6f837
 *            firstName: Lenard
 *            lastName: Hofstatter
 *            email: lHafstatter@email.com
 *            rol: student
 *            createdAt: 2020-03-10T04:05:06.157Z
 *         teacher:
 *            _id: 645d02643996292600e6f837
 *            firstName: Sheldon
 *            lastName: Cooper
 *            email: scooper@email.com
 *            rol: teacher
 *            createdAt: 2020-03-10T04:05:06.157Z
 *         title: The Big Bang Theory
 *         link1: http://ejemplo.com
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API for projects
 * 
 * /projects/:
 *   post:
 *     summary: Create project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectCreate'
 *     responses:
 *       201:
 *         description: Project created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *          description: Teacher not found
 */
router.post('/', createValidateRequest, createProject);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project id
 *     responses:
 *       200:
 *         description: Project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Project not found
 *       422: 
 *         description: Invalid Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidId'
 */
router.get("/:id", getProject);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectUpdate'
 *     responses:
 *       200:
 *         description: Project update
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Video already uploaded
 *       404:
 *         description: Project not found
 *       422: 
 *         description: Invalid Id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidId'
 */
router.put("/:id", updateValidateRequest, uploadProject); 

/**
* @swagger
* /projects/{id}:
*   delete:
*     summary: Delete project
*     tags: [Projects]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The project id
*     responses:
*       200:
*         description: Project deleted
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Project'
*       404:
*         description: Project not found
*       422: 
*         description: Invalid Id
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/InvalidId'
*/
router.delete("/:id", deleteProject);

export default router;