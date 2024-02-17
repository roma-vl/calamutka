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
import { writeFile } from 'node:fs/promises';
import pinoHttp from 'pino-http';
import fileupload from 'express-fileupload'
import config from './config/config.js';
import productRoutes from "./src/modules/products/routes/productRoutes.js";

export default async () => {
    const app = express();

    const pino = pinoHttp();
    app.use(pino)
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }))
    app.use(fileupload());

    // app.use(express.json())
    // Налаштування CORS
    const corsOptions = {
        origin: config.app.protocol + config.app.domain + config.app.port,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    };
    app.use(cors(corsOptions));
    app.options('*', cors(corsOptions));


    app.get('/ping', (req, res) => res.end(`calamutka-api ${process.env.NODE_ENV}`));


    await initAuth(app);
    await initSwagger(app);
    app.use('/users', userRoutes(knex));
    app.use('/products', productRoutes(knex));


    app.use('/s', (req, res) => {
        // console.log(req)
        console.log('Main PAge')
        res.status(200).json({ 'test' : 'test'});
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

    io.on('connection',    (socket) => {
        onConnection(io, socket);
    });

    app.use('/upload', async (req, res) => {
        try {
            console.log(req.files)
            console.log(req.body)
            const file = req.files.file;
            const roomId = req.body.roomId;

            if (!file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const destinationPath = './files/'+ roomId +'/';
            const filePath = `${destinationPath}${file.name}`;

            await writeFile(filePath, file.data, {});
            const relativeFilePath = filePath.replace(/^\.\/files/, '');

            res.status(201).json({relativeFilePath});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })

    app.use('/files', (req, res) => {
        const filePath = getFilePath(req.url);

        res.status(200).sendFile( filePath);
    });

    app.use(onError);

    return { server };
};
