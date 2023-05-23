import express from "express";

import {
  createValidateRequest, 
  updateValidateRequest, 
  evaluateValidateRequest
} from "./validate.js";
import {
  createProject,
  getProject,
  addVideo,
  deleteProject,
  evaluateVideo
} from "./controllers.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       required:
 *         - url
 *       properties:
 *         criticalThinking:
 *          type: string
 *         colaboration:
 *          type: string
 *         cromunication:
 *          type: string
 *         creativity:
 *          type: string
 *         approved:
 *          type: boolean
 * 
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
 *         link:
 *           type: string
 *           format: uri
 *           required: true
 *         order: 
 *           type: integer
 *           required: true
 *           minimum: 0
 *           maximum: 2
 *       example:
 *          link: http://ejemplo.com
 *          order: 0
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
 *         videos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Video'
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date was added
 *       example:
 *         _id: 645d02643996292600e6f837
 *         student: 
 *           _id: 645d02643996292600e6f837
 *           firstName: Lenard
 *           lastName: Hofstatter
 *           email: lHofstatter@email.com
 *           rol: student
 *           createdAt: 2020-03-10T04:05:06.157Z
 *         teacher:
 *           _id: 645d02643996292600e6f837
 *           firstName: Sheldon
 *           lastName: Cooper
 *           email: scooper@email.com
 *           rol: teacher
 *           createdAt: 2020-03-10T04:05:06.157Z
 *         title: The Big Bang Theory
 *         videos:
 *           - _id: 646afbe615a05113d8edba68
 *             url: http://hola.com
 *             approved: true
 *             creativity: muy bien
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
 *         description: Project id
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
 *     summary: Add video
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Project id
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
router.put("/:id", updateValidateRequest, addVideo); 

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
*         description: Project id
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

/**
* @swagger
* /projects/{id}/video/:videoId:
*   put:
*     summary: Evaluate a video
*     tags: [Projects]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: Project id
*       - in: path
*         name: videoId
*         schema:
*           type: string
*         required: true
*         description: Video id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               criticalThinking:
*                 type: string
*               colaboration:
*                 type: string
*               comunication:
*                 type: string
*               creativity:
*                 type: string
*               approved:
*                 type: boolean
*     responses:
*       200:
*         description: Video evaluated
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
router.put("/:id/video/:videoId", evaluateValidateRequest, evaluateVideo);

export default router;