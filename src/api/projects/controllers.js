import mongoose from "mongoose";
import Project from "../../models/projects.js";
import User from "../../models/users.js";

const createProject = async (request, response) => {
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
};

const getProject = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.isValidObjectId(id)) {
    return response.status(422).json({message: "Invalid Id"});
  }
  const project = await Project.findById(id).populate("teacher student");
  if (!project){
    return response.status(404).json({message: "Project not found"});
  }
  return response.status(200).json(project);
};

//El proyecto se edita cada vez que se cargue un video
const uploadProject = async (request, response) => {
  if(!object.keys(request.body).length) { 
    return response.status(400).json({ message: "Must send video URL" });
  }

  const { id } = request.params;
  
  if (!mongoose.isValidObjectId(id)) {
    return response.status(422).json({message: "Invalid Id"});
  }
  
  const project = await Project.findById(id).populate("teacher student");
  
  if (!project) {
    return response.status(404).json({message: "Project not found"});
  }
  
  if (request.body.link1 && project.link1) {
    return response.status(400).json({message: "Video already uploaded" });
  } else if (request.body.link2 && project.link2) {
    return response.status(400).json({message: "Video already uploaded" });
  } else if (request.body.link3 && project.link3) {
    return response.status(400).json({message: "Video already uploaded" });
  }

  const updatedProject = await Project.findByIdAndUpdate(id , request.body, { new: true });
  return response.status(200).json(updatedProject);
};

//En caso de desaprobar, se elimina de la base de datos y se carga uno nuevo
const deleteProject = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.isValidObjectId(id)) {
    return response.status(422).json({message: "Invalid Id"});
  }
  const project = await Project.findById(id).populate("teacher student");
  if (!project) {
    return response.status(404).json({message: "Project not found"});
  }
  const deletedProject = await Project.findByIdAndDelete(id);
  return response.status(200).json(deletedProject);
};

export { createProject, getProject, uploadProject, deleteProject };