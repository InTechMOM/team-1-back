import { Schema, model } from "mongoose";

// Definimos la estructura de datos del video
const projectSchema = new Schema({
  link1: {
    type: String,
    required: false,
  },
  link2: {
    type: String,
    required: false,
  },
  link3: {
    type: String,
    required: false,
  },
  title: {
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
const Project = model('Project', projectSchema);

export default Project;