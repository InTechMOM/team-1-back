import mongoose  from "mongoose";
import User from "../../models/users.js";

const createUser = async (request, response) => {
  const newUser = new User({ ...request.body });
  const user = await newUser.save();
  return response.status(201).json(user); 
};

const getUser = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.isValidObjectId(id)) {
    return response.status(422).json({message: "Invalid Id"});
  }
  const user = await User.findById(id);
  if (!user){
    return response.status(404).json({message: "User not found"});
  }
  return response.status(200).json(user);
};

const putUser = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.isValidObjectId(id)) {
    return response.status(422).json({message: "Invalid Id"});
  }
  const user = await User.findById(id);
  if (!user) {
    return response.status(404).json({message: "User not found"});
  }
  const updatedUser = await User.findByIdAndUpdate(id , request.body, { new: true });
  return response.status(200).json(updatedUser);
};

const deleteUser = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.isValidObjectId(id)) {
    return response.status(422).json({message: "Invalid Id"});
  }
  const user = await User.findById(id);
  if (!user) {
    return response.status(404).json({message: "User not found"});
  }
  const deletedUser = await User.findByIdAndDelete(id);
  return response.status(200).json(deletedUser);
};

export { createUser, getUser, putUser, deleteUser };