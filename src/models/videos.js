import { Schema, model } from "mongoose";

// Definimos la estructura de datos de cada video
const videoSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  criticalThinking: {
    type: String,
    required: false,
  },
  colaboration: {
    type: String,
    required: false,
  },
  communication: {
    type: String,
    required: false,
  },
  creativity: {
    type: String,
    required: false,
  },
  approved: {
    type: Boolean,
    required: false,
  },
});

const Video = model('Video', videoSchema);

export default Video;