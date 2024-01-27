import express from 'express';
import {getAllUsers} from '../controllers/userController.js';
import {validateUserData} from '../middleware/validation.js';
import {logRequest} from '../middleware/logger.js';

const userRoutes = (knex) => {
    const app = express.Router();

    app.use(validateUserData);
    app.use(logRequest);
    app.get('/', getAllUsers(knex));

    return app;
};

export default userRoutes;
