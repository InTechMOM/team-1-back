import { Schema, model } from "mongoose";

// Definimos la estructura de datos del proyecto
const projectSchema = new Schema({
  // link1: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Video",
  //   required: false,
  // },
  // link2: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Video",
  //   required: false,
  // },
  // link3: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Video",
  //   required: false,
  // },
  videos: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: false,
    }]
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

// creamos la tabla de proyectos
const Project = model('Project', projectSchema);

export default Project;