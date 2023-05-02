import express from "express";

import { port } from "./src/config/index.js";
import { dbConnection } from "./src/config/db_connection.js";
import usersRouter from "./src/api/users/routes.js";
import videoRouter from "./src/api/videos/routes.js"

const app = express();

// Connect with mongoDB
dbConnection();

app.use(express.json());

// Load routers
app.use('/users', usersRouter);
app.use('/videos', videoRouter);

app.get("/", (request, response, error) => {
  response.send("status: ok")  
})

// Runing the server
app.listen(port, (error) => {
  if (error) {
    console.log("Server Error: Failed");
    process.exit(1);
  }

  console.log(`server listening in port ${port}`)
})
