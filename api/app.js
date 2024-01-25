const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const config = require('config');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const authRoutes = require('./routes/auth');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your-secret-key', // Замініть на ваш секретний ключ
};
const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
  },
  apis: ['./*.js'], // Шляхи до вашого коду, які мають Swagger анотації.
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const port = process.env.PORT || 4000;

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
  console.log(config.get('database.mysql'));

  const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'mysql_database',
      port : 3306,
      user : 'calamutka',
      password : 'calamutka',
      database : 'calamutka'
    }
  });
  knex
      .select('*')
      .from('users')
      .then(rows => {
        console.log(rows); // Вивести результати вибірки в консоль
      })
      .catch(error => {
        console.error(error); // Обробити помилку, якщо вона виникне
        console.error('kkkk'); // Обробити помилку, якщо вона виникне
      });

  res.json({
    'title' : 'Home Route',
    'post' : [
      {
        'id' : 1,
        'title': 'Title 1',
      },
      {
        'id' : 2,
        'title': 'Title 2',
      }
    ]
  });
});

app.use('/auth', authRoutes);
app.listen(port, () =>
    console.log(`Server running on port ${port}, http://localhost:${port}`)
);
