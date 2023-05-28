import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { port } from "./src/config/index.js";
import { dbConnection } from "./src/config/db_connection.js";
import router from "./src/router.js"
import errorHandler from "./src/middleware.js";
import { openApiSpecification } from "./src/config/swagger.js";

const app = express();

// Connect with mongoDB
dbConnection();

app.use(cors());
app.use(express.json());

// App router
app.use("/", router);
app.get("/", (request, response, error) => {
  response.send("status: ok")  
})

// Config Swagger
app.use("/docs", swaggerUi.serve);
app.get("/docs", swaggerUi.setup(openApiSpecification));

// Global error handler
app.use(errorHandler);

app.listen(port, (error) => {
  if (error) {
    console.log("Server Error: Failed");
    process.exit(1);
  }

  console.log(`server listening in port ${port}`)
})
