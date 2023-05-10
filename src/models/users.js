import { Schema, model } from "mongoose";

// Definimos la estructura de datos del usuario
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rol: {
    type: String,
    required: true,
    enum: ['student', 'teacher']
  },
  creationDate: {
    type: Date,
    default: Date.now,
  }
});

// creamos la tabla de usuarios
const User = model('User', userSchema);

export default User;