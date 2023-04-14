import express from "express";
import * as mongoose from "mongoose"
import { port } from "./config/index.js";

const app = express();

app.get("/", (request, response, error) => {
  response.send("status: ok")  
})

app.listen(port, (error) => {
  if (error) {
    console.log("Server Error: Failed");
    process.exit(1);
  }

  console.log(`server listening in port ${port}`)
})

// mongodb conection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));
