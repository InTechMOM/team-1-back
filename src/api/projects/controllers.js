import mongoose from "mongoose";
import Project from "../../models/projects.js";
import User from "../../models/users.js";

const createProject = async (request, response) => {
  const student = await User.findOne({ email: request.body.studentEmail , rol: "student" });
  if (!student){
    return response.status(404).json({menssage: "Student not found"});
  }
  const teacher = await User.findOne({ email: request.body.teacherEmail , rol: "teacher" });
  if (!teacher){
    return response.status(404).json({menssage: "Teacher not found"});
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
    return response.status(404).json({menssage: "Project not found"});
  }
  return response.status(200).json(project);
};

//El proyecto se edita cada vez que se cargue un video
const editProject = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.isValidObjectId(id)) {
    return response.status(422).json({message: "Invalid Id"});
  }
  const project = await Project.findById(id).populate("teacher student");
  if (!project) {
    return response.status(404).json({menssage: "Project not found"});
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
    return response.status(404).json({menssage: "Project not found"});
  }
  const deletedProject = await Project.findByIdAndDelete(id);
  return response.status(200).json(deletedProject);
};

export { createProject, getProject, editProject, deleteProject };