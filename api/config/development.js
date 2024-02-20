import developmentDb from './developmentDb.js';
import developmentMail from "./developmentMail.js";

export default {
    app: {
        protocol: 'https://',
        domain: 'calamutka.com',
        port: ''
    },
    passport: {
        jwtSecretKey: 'your-secret-key',
    },
    database: developmentDb,
    mail: developmentMail
};

