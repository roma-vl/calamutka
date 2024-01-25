// У вашому файлі auth.js

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const {log} = require("util");
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

// Налаштування JWT стратегії
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your-secret-key', // Поміняйте на свій секретний ключ
};

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {

    console.log('JwtStrategy initialized');
    try {
        console.log(jwtPayload.sub, 'jwtPayload.sub')
        const [user] = await knex('users').select().where('id', jwtPayload.sub);
        console.log(user, 'fefsfsdf')
        if (user) {
            console.log('asdasdasdasd')
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error, false);
    }
}));

const router = express.Router();

// Маршрут для отримання JWT токена під час входу
router.post('/login', async (req, res) => {
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
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'Protected Route', user: req.user });
});

// Інші маршрути аутентифікації, які вам можуть знадобитися

module.exports = router;
