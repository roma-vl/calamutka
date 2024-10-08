import developmentDb from './developmentDb.js';
import developmentMail from "./developmentMail.js";

export default {
    app: {
        protocol: 'http://',
        domain: 'calamutka.com',
        port: ''
    },
    devApp: {
        protocol: 'http://',
        domain: 'calamutka.com',
        port: ':8080'
    },
    passport: {
        jwtSecretKey: 'your-secret-key',
    },
    database: developmentDb,
    mail: developmentMail
};

