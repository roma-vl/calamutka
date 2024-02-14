import developmentDb from './developmentDb.js';

export default {
    app: {
        protocol: 'https://',
        domain: 'calamutka.com',
        port: ''
    },
    passport: {
        jwtSecretKey: 'your-secret-key',
    },
    database: developmentDb
};

