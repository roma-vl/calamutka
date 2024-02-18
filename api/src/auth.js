import config from '../config/config.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import knex from './modules/app/src/connection/app.js';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import {log} from "util";
import cookieParser from "cookie-parser";
import checkAuth from "./modules/app/src/auth/midleware/checkAuth.js";
import session from "express-session";

async function initAuth(app) {
  // app.use(session({
  //   secret: "your-secret-key", // Замініть це на реальний секретний ключ
  //   resave: false,
  //   saveUninitialized: true
  // }));

  app.use(passport.initialize());
  // app.use(passport.session());
  // app.use(cookieParser());

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.passport.jwtSecretKey,
  };

  passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const [user] = await knex('users').select().where('id', jwtPayload.sub);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error, false);
    }
  }));

  app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    console.log(req.body, 'req.body');
    try {

      const [user] = await knex.select('*').from('users').where('email', email);

      if (!user || user.length === 0) {
        return res.json({
          code: 401,
          message: 'Користувача з таким Email не знайдено'
        });
      }

      if (user.password !== password) {
        return res.json({
          code: 401,
          message: 'Невірний пароль',
        });
      }

      const token = jwt.sign({sub: user.id}, 'your_secret_key', {expiresIn: '1h'});
      console.log(token)

      res.cookie('accessToken', token, {
        maxAge: 12 * 60 * 60 * 1000,
        path: '/',
        domain: '.' + config.app.domain,
        // httpOnly: true,
        secure: true,
        sameSite: 'None'
      }); // TODO коли буде https додати -> secure: true  sameSite: 'None' httpOnly: true,

      res.status(200).json({message: 'Authentication successful', user});
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Internal server error'});
    }
  });


  app.post('/register', async (req, res) => {
    const {first_name, last_name, email, password} = req.body;
    console.log(req.body, 'req.body');
    try {
      // Пошук користувача в базі даних за ім'ям користувача
      const [user] = await knex.select('*').from('users').where('email', email);

      if (first_name === ''|| last_name === ''|| email === '' || password === '') {
        return res.json({
          code: 401,
          message: 'Всі поля мають бути заповнені'
        });
      }

      if (user) {
        return res.json({
          code: 401,
          message: 'Користувач з таким Email вже є'
        });
      }

      // Додавання нового користувача в базу даних
      const newUser = {
        username: email,
        password,
        first_name,
        last_name,
        email,

      };

      const [userId] = await knex('users').insert(newUser);

      const registeredUser = await knex.select('*').from('users').where('id', userId).first();

      const token = jwt.sign({sub: registeredUser.id}, 'your_secret_key', {expiresIn: '1h'});
      console.log(token)

      res.cookie('accessToken', token, {
        maxAge: 60 * 60 * 1000,
        domain: '.' + config.app.domain,
      });
      res.status(200).json({ message: 'Нового користувача зареєстровано', user: registeredUser });

    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Internal server error'});
    }
  });

  app.get('/logout', async (req, res, next) => {
    res.cookie('accessToken', null, {
      maxAge: 0,
      expires: new Date(0),
      domain: '.' + config.app.domain,
      httpOnly: false,
      sameSite: 'Lax',
      path: '/'
    });

    res.json({ message: 'Logout successful' });
  })

  app.get('/auth/user', checkAuth, (req, res) => {
    res.json({user: req.user});
  });
}

export default initAuth;

