import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MVP IntechMom',
      version: '1.0.0',
    },
  },
  apis: [
    './src/api/users/routes.js',
    './src/api/auth/routes.js',
  ], 
};

export const openApiSpecification = swaggerJSDoc(swaggerOptions);