import initAuth from './src/auth.js';
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import knex from './src/modules/app/src/connection/app.js';
import initSwagger from './src/swagger.js';
import userRoutes from './src/modules/users/routes/userRoutes.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import onConnection from './socket_io/onConnection.js';
import { getFilePath } from './utils/file.js'
import onError from './utils/onError.js'
import upload from './utils/upload.js'

export default async () => {
    const app = express();
    app.get('/ping', (req, res) => res.end(`calamutka-api ${process.env.NODE_ENV}`));
    app.use(bodyParser.json());

    await initAuth(app);
    await initSwagger(app);
    app.use('/users', userRoutes(knex));

    app.use(cors({ origin: '*', maxAge: 300 }));

    app.get('/', (req, res) => {
        knex
            .select('*')
            .from('users')
            .then(rows => {
                console.log(rows);
                res.json(rows); // Вивести результати вибірки в консоль
            })
            .catch(error => {
                console.error(error); // Обробити помилку, якщо вона виникне
            });

    });

    app.use('/upload', upload.single('file'), (req, res) => {
        if (!req.file) return res.sendStatus(400);

        // формируем относительный путь к файлу
        const relativeFilePath = req.file.path
            .replace(/\\/g, '/')
            .split('server/files')[1];

        // и возвращаем его
        res.status(201).json(relativeFilePath);
    });

    app.use('/files', (req, res) => {
        // формируем абсолютный путь к файлу
        const filePath = getFilePath(req.url);

        // и возвращаем файл по этому пути
        res.status(200).sendFile(filePath);
    });

    const server = createServer(app);

    const io = new Server(server, {
        cors: 'http://localhost:3000',
        serveClient: false
    });

    io.on('connection', (socket) => {
        onConnection(io, socket);
    });
    return { app };
};




