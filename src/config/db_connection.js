import * as mongoose from "mongoose"

export const dbConnection = () => {
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));
}
