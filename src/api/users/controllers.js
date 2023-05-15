import User from "../../models/users.js";

/**
 * @openapi
 * /users:
 *   post:
 *     description: Creation API for users
 *     responses:
 *       201:
 *         description: User created  
 */

const createUser = async (request, response) => {
  const newUser = new User({ ...request.body });
  const user = await newUser.save();
  return response.status(201).json(user); 
};

/**
 * @openapi
 * /users:
 *   get:
 *     description: Creation API for users
 *     responses:
 *       200:
 *         description: Get user
 *       404:
 *         description: User not found  
 */

const getUser = async (request, response) => {
  const { id } = request.params;
  const user = await User.findById(id);
  if (!user){
    return response.status(404).json({message: "User not found"});
  }
  return response.status(200).json(user);
};

/**
 * @openapi
 * /users:
 *   put:
 *     description: Creation API for users
 *     responses:
 *       200:
 *         description: User update
 *       404:
 *         description: User not found  
 */

const putUser = async (request, response) => {
  const { id } = request.params;
  const user = await User.findById(id);
  if (!user) {
    return response.status(404).json({message: "User not found"});
  }
  const updatedUser = await User.findByIdAndUpdate(id , request.body, { new: true });
  return response.status(200).json(updatedUser);
};

/**
 * @openapi
 * /users:
 *   delete:
 *     description: Creation API for users
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found  
 */

const deleteUser = async (request, response) => {
  const { id } = request.params;
  const user = await User.findById(id);
  if (!user) {
    return response.status(404).json({menssage: "User not found"});
  }
  const deletedUser = await User.findByIdAndDelete(id);
  return response.status(200).json(deletedUser);
};

export { createUser, getUser, putUser, deleteUser };