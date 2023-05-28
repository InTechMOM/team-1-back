import * as mongoose from "mongoose"

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas");
  } catch (error) { 
    console.error(error)
  };
};
