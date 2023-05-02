import { Schema , model} from "mongoose";

//Definimps la estructura de datos de la carga de video
const videoSchema = new Schema ({
  url: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  studentName: {
    type: String,
    require: true
  },
  studentEmail: {
    type: String,
    require: true
  },
  teacherEmail: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
})

// creamos la tabla de videos
const Video = model('Video', videoSchema);

export default Video;