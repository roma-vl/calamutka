const developmentDb = require('./developmentDb');
module.exports = {
    passport: {
        jwtSecretKey: 'your-secret-key',
    },
    database: developmentDb
};

