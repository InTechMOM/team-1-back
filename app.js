import express from "express";

import { port } from "./src/config/index.js";
import { dbConnection } from "./src/config/db_connection.js";
import router from "./src/router.js"

const app = express();

// Connect with mongoDB
dbConnection();

app.use(express.json());
app.use("/", router);

// Runing the server
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
