import User from "../../models/users.js";

const createUser = async (request, response) => {
  const newUser = new User({ ...request.body });
  const user = await newUser.save();
  return response.status(201).json(user); 
};

const getUser = async (request, response) => {
  const { id } = request.params;
  const user = await User.findById(id);
  if (user != null) {
    return response.status(200).json(user);
  } else {
    return response.status(404).json({menssage: "User not found"});
  }
};

const putUser = async (request, response) => {
  const { id } = request.params;
  const updatedUser = await User.findByIdAndUpdate(id , request.body);
  return response.status(200).json(updatedUser);
};

const deleteUser = async (request, response) => {
  const { id } = request.params;
  const deletedUser = await User.findByIdAndDelete(id);
  return response.status(200).json(deletedUser);
};

export { createUser, getUser, putUser, deleteUser };