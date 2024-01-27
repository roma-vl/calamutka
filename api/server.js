import initAuth from './src/auth.js';
import express from 'express';
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
// const io = require('socket.io')(httpServer);

export default async () => {
    const app = express();
    // app.get('/ping', (req, res) => res.end(`calamutka-api ${process.env.NODE_ENV}`));
    // app.use(bodyParser.json());

    // await initAuth(app);
    // await initSwagger(app);
    // app.use('/users', userRoutes(knex));

    // Налаштування CORS
    const corsOptions = {
        origin: '*', // Вкажіть свій домен
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        optionsSuccessStatus: 204,
    };

    app.use(cors(corsOptions));

    const io = new Server(createServer(app), {
        cors: {
            origin: 'calamutka.com',
            methods: ['GET', 'POST', 'OPTIONS']
        },
        serveClient: false,
        path: '/'

    });

    io.on('connection', (socket) => {
        console.log(socket, '1111111111111111111111111111')
        console.log(io, '1111111111111111111111111111')
        onConnection(io, socket);
    });
    // Логування отриманих запитів
    app.use((req, res, next) => {
        console.log(`Received ${req.method} request to ${req.originalUrl}`);
        console.log('Request Body:', req.body);
        next();
    });

    // app.get('/socket.io', (req, res) => {
    //     // const server = createServer(app);
    //
    //     const io = new Server(createServer(app), {
    //         cors: {
    //             origin: 'calamutka.com',
    //             methods: ['GET', 'POST', 'OPTIONS']
    //         },
    //         serveClient: false
    //     });
    //
    //     io.on('connection', (socket) => {
    //         console.log(socket, '1111111111111111111111111111')
    //         console.log(io, '1111111111111111111111111111')
    //         onConnection(io, socket);
    //     });
    //
    // });

    // knex
    //     .select('*')
    //     .from('users')
    //     .then(rows => {
    //         console.log(rows);
    //         res.json(rows);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         res.status(500).json({ message: 'Internal server error' });
    //     });
    app.use('/upload', upload.single('file'), (req, res) => {
        if (!req.file) return res.sendStatus(400);

        const relativeFilePath = req.file.path
            .replace(/\\/g, '/')
            .split('server/files')[1];

        res.status(201).json(relativeFilePath);
    });

    app.use('/files', (req, res) => {
        const filePath = getFilePath(req.url);
        res.status(200).sendFile(filePath);
    });

    app.use(onError);



    return { app };
};
