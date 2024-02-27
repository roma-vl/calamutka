import express from 'express';
import  UserController from '../controllers/UserController.js';
import { validateUserData } from '../middleware/validation.js';
import { logRequest } from '../middleware/logger.js';

const userRoutes = (knex) => {
    const app = express.Router();

    app.use(validateUserData);
    app.use(logRequest);

    // Маршрути для кожного методу CRUD
    app.get('/', UserController.getAllUsers);
    app.post('/', UserController.createUser);
    app.get('/:id', UserController.getUserById);
    app.put('/:id', UserController.updateUserById);
    app.delete('/:id', UserController.deleteUserById);

    return app;
};

export default userRoutes;
