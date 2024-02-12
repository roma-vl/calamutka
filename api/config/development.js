import developmentDb from './developmentDb.js';

export default {
    app: {
        protocol: 'https://',
        domain: 'calamutka.com',
        port: ':444'
    },
    passport: {
        jwtSecretKey: 'your-secret-key',
    },
    database: developmentDb
};

