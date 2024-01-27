const express = require('express');
const userController = require('../controllers/userController');
const validateUserDataMiddleware = require('../midleware/validation')
const loggingMiddleware = require('../midleware/logger')
const userRoutes = (knex) => {
    const app = express.Router();

    app.use(validateUserDataMiddleware.validateUserData);
    app.use(loggingMiddleware.logRequest);
    app.get('/', userController.getAllUsers(knex));

    return app;
};

module.exports = userRoutes;
