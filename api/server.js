const initAuth = require("./src/auth");
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('./src/modules/app/src/connection/app');
const initSwagger = require("./src/swagger");
const userRoutes = require("./src/modules/users/routes/userRoutes");


module.exports = async () => {
    const app = express();
    app.get('/ping', (req, res) => res.end(`calamutka-api ${process.env.NODE_ENV}`));
    app.use(bodyParser.json());

    await initAuth(app);
    await initSwagger(app);
    app.use('/users', userRoutes(knex));

    app.use(cors({ origin: '*', maxAge: 300 }));
    /**
     * @openapi
     * '/api/user/register':
     *  post:
     *     tags:
     *     - User Controller
     *     summary: Create a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - username
     *              - email
     *              - password
     *            properties:
     *              username:
     *                type: string
     *                default: johndoe
     *              email:
     *                type: string
     *                default: johndoe@mail.com
     *              password:
     *                type: string
     *                default: johnDoe20!@
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    app.get('/', (req, res) => {
        knex
            .select('*')
            .from('users')
            .then(rows => {
                console.log(rows);
                res.json(rows);// Вивести результати вибірки в консоль
            })
            .catch(error => {
                console.error(error); // Обробити помилку, якщо вона виникне
            });

    });
    return { app };
}





