import initAuth from './src/auth.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import knex from './src/modules/app/src/connection/app.js';
import initSwagger from './src/swagger.js';
import userRoutes from './src/modules/users/routes/userRoutes.js';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import onConnection from './socket_io/onConnection.js';
import { getFilePath } from './utils/file.js'
import onError from './utils/onError.js'
import upload from './utils/upload.js'
// const io = require('socket.io')(httpServer);
const users = {}
export default async () => {
    const app = express();
    app.get('/ping', (req, res) => res.end(`calamutka-api ${process.env.NODE_ENV}`));
    // app.use(bodyParser.json());

    // await initAuth(app);
    // await initSwagger(app);
    // app.use('/users', userRoutes(knex));

    // Налаштування CORS
    const corsOptions = {
        origin: '*', // Вкажіть свій домен
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        // credentials: true,
        // optionsSuccessStatus: 204,
    };

    app.use(cors(corsOptions));
    app.options('/upload', cors(corsOptions));

    app.get('/', (req, res) => {
        console.log('Main PAge')
    });

    const server = createServer(app);
        const io = new Server(server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST', 'OPTIONS']
            },
            serveClient: false,
            path: '',
            connectionStateRecovery: {}
        });

        io.on('connection',   async (socket) => {
           await onConnection(io, socket);
            const { roomId, userName } = socket.handshake.query
            // инициализируем хранилище пользователей
            if (!users[roomId]) {
                users[roomId] = []
            }
            // утилита для обновления списка пользователей
            const updateUserList = () => {
                // сообщение получают только пользователи, находящиеся в комнате
                io.to(roomId).emit('user_list:update', users[roomId])
            }

            // обрабатываем подключение нового пользователя
            socket.on('user_add',   async (user) => {
                // сообщаем другим пользователям об этом
              await  socket.to(roomId).emit('log', `User ${userName} connected`)
                // записываем идентификатор сокета пользователя
                user.socketId = socket.id;
                // записываем пользователя в хранилище
                users[roomId].push(user)
                // обновляем список пользователей
                io.to(roomId).emit('user_list:update', users[roomId])
            })

            // обрабатываем отключения пользователя
            socket.on('disconnect', () => {
                if (!users[roomId]) return
                // сообщаем об этом другим пользователям
                io.to(roomId).emit('log', `User ${userName} disconnected`)
                // удаляем пользователя из хранилища
                users[roomId] = users[roomId].filter((u) => u.socketId !== socket.id)
                // обновляем список пользователей
                updateUserList()
            })
        });


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
        console.log(req.file, 'req.file')
        if (!req.file) return res.sendStatus(400);

        const relativeFilePath = req.file.path
            .replace(/\\/g, '/')
            .split('app/files')[1];
        res.status(201).json(relativeFilePath);
    });

    app.use('/files', (req, res) => {
        const filePath = getFilePath(req.url);
        console.log( filePath, 'шлях')
        res.status(200).sendFile( filePath);
    });

    app.use(onError);

    return { server };
};
