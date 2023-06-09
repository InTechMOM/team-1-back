import mongoose from "mongoose";
import Project from "../../models/projects.js";
import User from "../../models/users.js";
import Video from "../../models/videos.js";

const createProject = async (request, response) => {
  try {
    const student = await User.findOne({ email: request.body.studentEmail , rol: "student" });
    if (!student){
      return response.status(404).json({message: "Student not found"});
    }
    const teacher = await User.findOne({ email: request.body.teacherEmail , rol: "teacher" });
    if (!teacher){
      return response.status(404).json({message: "Teacher not found"});
    }
    const newProject = new Project({
      title: request.body.title,
      student: student._id,
      teacher: teacher._id,
    });
    const project = await newProject.save();
    return response.status(201).json(project); 
  } catch(error) {
    next(error);
  }
};

const getProject = async (request, response) => {
  try {
    const { id } = request.params;
    if (!mongoose.isValidObjectId(id)) {
      return response.status(422).json({message: "Invalid Id"});
    }
    const project = await Project.findById(id).populate("teacher student videos");
    if (!project){
      return response.status(404).json({message: "Project not found"});
    }
    return response.status(200).json(project);
  } catch(error) {
    next(error);
  }
};

//El proyecto se edita cada vez que se cargue un video
const addVideo = async (request, response) => {
  try {
    const { id } = request.params;
    //Se chequea que el Id del proyecto sea un Id de Mongoose válido
    if (!mongoose.isValidObjectId(id)) {
      return response.status(422).json({message: "Invalid Id"});
    }
    
    const project = await Project.findById(id).populate("videos");
    //Se chequea que efectivamente exista el proyecto
    if (!project) {
      return response.status(404).json({message: "Project not found"});
    }
    
    const { order } = request.body;

    if (order === 0 && project.videos.length != 0 && project.videos[0].approved !== false) {
      return response.status(400).json({message: "Video already uploaded" });
    } else if (order === 1) {
      if (project.videos.length === 2 && project.videos[1].approved !== false){
        return response.status(400).json({message: "Video already uploaded" });
      } else if (project.videos.length !== 1) {
        return response.status(400).json({message: "Previous video was not uploaded"});
      } else if (project.videos[0].approved !== true) {
        return response.status(400).json({message: "Previos video is not approved"});
      } 
    } else if (order === 2) {
      if (project.videos.length === 3 && project.videos[2].approved !== false) {
        return response.status(400).json({message: "Video already uploaded" });
      } else if (project.videos.length !== 2) {
        return response.status(400).json({message: "Previous video was not uploaded" });
      } else if (project.videos[1].approved !== true) {
        return response.status(400).json({message: "Previos video is not approved"});
      }
    } 

    const newVideo = new Video({
      url: request.body.link,
    });
    const video = await newVideo.save();

    //Se crea una lista con los videos actuales 
    //y se agrega el Id del nuevo video
    const videos = [...project.videos];
    if (project.videos[order]?.approved === false) {
      videos[order] = video._id;
    } else {
      videos.push(video._id);
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id , {videos: videos}, { new: true }
    ).populate("teacher student videos");
    return response.status(200).json(updatedProject);
  } catch(error) {
    next(error);
  }
};

//En caso de desaprobar, se sobrescribe de la base de datos y se carga uno nuevo
const deleteProject = async (request, response) => {
  try {
    const { id } = request.params;
    if (!mongoose.isValidObjectId(id)) {
      return response.status(422).json({message: "Invalid Id"});
    }
    const project = await Project.findById(id).populate(
      "teacher student videos"
    );
    if (!project) {
      return response.status(404).json({message: "Project not found"});
    }
    const deletedProject = await Project.findByIdAndDelete(id);
    return response.status(200).json(deletedProject);
  } catch(error) {
    next(error);
  }
};

const evaluateVideo = async (request, response) => {
  try {
    const { id, videoId } = request.params;
    //Se chequea que el Id del proyecto y del video sean Id's de Mongoose válidos
    if (!mongoose.isValidObjectId(id)) {
      return response.status(422).json({message: "Invalid Id"});
    }
    if (!mongoose.isValidObjectId(videoId)) {
      return response.status(422).json({message: "Invalid Id"});
    }

    //Se chequea que el Id del proyecto y del video existan en la base de datos
    let project = await Project.findById(id);
    if (!project) {
      return response.status(404).json({message: "Project not found"});
    }
    const video = await Video.findById(videoId);
    if (!video) {
      return response.status(404).json({message: "Video not found"});
    }

    //Se actualiza el video
    const updatedVideo = await Video.findByIdAndUpdate(
      videoId, request.body, { new: true }
    );

    project = await Project.findById(id).populate("teacher student videos");
    return response.status(200).json(project);
  } catch(error) {
    next(error);
  }
};

export { createProject, getProject, addVideo, deleteProject, evaluateVideo };