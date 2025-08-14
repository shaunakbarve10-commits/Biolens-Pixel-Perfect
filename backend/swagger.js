const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "BIO LENS API",
            version: "1.0.0",
            description: "API documentation for BIO LENS project"
        }
    },
    apis: ["./backend/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
