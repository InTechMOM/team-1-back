import express from "express";

import validateRequest from "./validate.js";
import { createVideo, getVideo, editVideo, deleteVideo } from "./controllers.js";

const router = express.Router();

router.post('/', validateRequest, createVideo);

router.get("/:id", getVideo);

router.put("/:id", validateRequest, editVideo); 

router.delete("/:id", deleteVideo);

export default router;