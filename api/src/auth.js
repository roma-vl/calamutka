const express = require('express');
const config = require('config');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const knex = require('./modules/app/src/connection/app');
const {Strategy: JwtStrategy, ExtractJwt} = require("passport-jwt");

async function initAuth(app) {

    app.use(passport.initialize());

    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.get('passport.jwtSecretKey'),
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
        const { username, password } = req.body;
        console.log(req.body, 'req.body')
        try {
            // Пошук користувача в базі даних за ім'ям користувача
            const [user] = await knex.select('*').from('users').where('username', username);

            if (!user || user.length === 0) {
                return res.status(401).json({ message: 'Authentication failed' });
            }

            // Перевірка правильності пароля
            if (user.password !== password) {
                return res.status(401).json({ message: 'Authentication failed' });
            }

            // Аутентифікація успішна, генерація та відправка JWT токена
            const token = jwt.sign({ sub: user.id }, jwtOptions.secretOrKey, { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

// Захищений маршрут, доступний тільки з дійсним токеном
    app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
        res.json({ message: 'Protected Route', user: req.user });
    });
}

module.exports = initAuth;
