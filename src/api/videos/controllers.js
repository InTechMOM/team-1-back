import Video from "../../models/videos.js";
import User from "../../models/users.js";

const createVideo = async (request, response) => {
  const student = await User.findOne({ email: request.body.studentEmail , rol: "student" });
  if (student === null){
    return response.status(404).json({menssage: "Student not found"});
  }
  const teacher = await User.findOne({ email: request.body.teacherEmail , rol: "teacher" });
  if (teacher === null){
    return response.status(404).json({menssage: "Teacher not found"});
  }
  const newVideo = new Video({
    link: request.body.link,
    title: request.body.title,
    description: request.body.description,
    student: student._id,
    teacher: teacher._id,
  });
  const video = await newVideo.save();
  return response.status(201).json(video); 
};

const getVideo = async (request, response) => {
  const { id } = request.params;
  const video = await Video.findById(id).populate("teacher student");
  if (video === null){
    return response.status(404).json({menssage: "Video not found"});
  }
  return response.status(200).json(video);
};

//preguntar si se van a editar los videos
const editVideo = async (request, response) => {
  const { id } = request.params;
  const video = await Video.findById(id).populate("teacher student");
  if (video === null) {
    return response.status(404).json({menssage: "Video not found"});
  }
  const updatedVideo = await Video.findByIdAndUpdate(id , request.body, { new: true });
  return response.status(200).json(updatedVideo);
};

//preguntar si se van a poder borrar los videos
const deleteVideo = async (request, response) => {
  const { id } = request.params;
  const video = await Video.findById(id).populate("teacher student");
  if (video === null) {
    return response.status(404).json({menssage: "Video not found"});
  }
  const deletedVideo = await Video.findByIdAndDelete(id);
  return response.status(200).json(deletedVideo);
};

export { createVideo, getVideo, editVideo, deleteVideo };