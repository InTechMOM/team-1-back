import { Schema, model } from "mongoose";

// Definimos la estructura de datos del video
const videoSchema = new Schema({
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  }
});

// creamos la tabla de videos
const Video = model('Video', videoSchema);

export default Video;