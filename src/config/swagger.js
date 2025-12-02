const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Orders API",
      version: "1.0.0",
      description: "Simple API for creating and managing orders."
    }
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = 
{
  swaggerUi,
  specs
};
