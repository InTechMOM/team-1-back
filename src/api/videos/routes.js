import express from "express";
import Joi from 'joi';
import { createValidator } from "express-joi-validation";

import Video from "../../models/video.js";

const router = express.Router();
const validator = createValidator();

const videoSchema = Joi.object({
  url: Joi.string().uri(),
  title: Joi.string().required(),
  studentName: Joi.string().required(),
  studentEmail: Joi.string().email().required(),
  teacherEmail: Joi.string().email().required(),
  description: Joi.string().required(),
});

router.post('/', validator.body(videoSchema), async (request, response) => {
  const newVideo = new Video({ ...request.body });
  const video = await newVideo.save();
  return response.status(201).json(video);
});

router.get("/:id", async (request, response) => {
  const { id } = reques.params;
  const video = await Video.findById(id);
  if (video != null) {
    return response.status(200).json(user);
  } else {
    return response.status(404).json({menssage: "Video not found"});
  }
})

router.put("/:id", validator.body(videoSchema), async (request, response) => {
  const { id } = request.params;
  const updatedVideo = await Video.findByIdAndUpdate(id , request.body);
  return response.status(200).json(updatedVideo);
});

router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const deletedVideo = await Video.findByIdAndDelete(id);
  return response.status(200).json(deletedVideo);
});

export default router;