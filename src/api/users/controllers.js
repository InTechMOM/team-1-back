import mongoose  from "mongoose";
import User from "../../models/users.js";

const createUser = async (request, response, next) => {
  try {
    const newUser = new User({ ...request.body });
    const user = await newUser.save();
    return response.status(201).json(user); 
  } catch(error) {
    next(error);
  }
};

const getUsers = async (request, response) => {
  try {
    const rol = request.query.rol;
    let filters;
    if (!rol) {
      filters = {}
    } else {
      filters = {rol: rol};
    }
    const users = await User.find(filters);
    return response.status(200).json(users);
  } catch(error) {
    next(error);
  }
}

const getUser = async (request, response) => {
  try {
    const { id } = request.params;
    if (!mongoose.isValidObjectId(id)) {
      return response.status(422).json({message: "Invalid Id"});
    }
    const user = await User.findById(id);
    if (!user){
      return response.status(404).json({message: "User not found"});
    }
    return response.status(200).json(user);
  } catch(error) {
    next(error);
  }
};

const putUser = async (request, response) => {
  try {
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
  } catch(error) {
    next(error);
  }
};

const deleteUser = async (request, response) => {
  try {
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
  } catch(error) {
    next(error);
  }
};

export { createUser, getUsers, getUser, putUser, deleteUser };