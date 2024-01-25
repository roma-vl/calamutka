const config = require('config');
const connection = require('knex')({
    client: config.get('database.mysql.client'),
    connection: {
        host : config.get('database.mysql.connection.host'),
        port : config.get('database.mysql.connection.port'),
        user : config.get('database.mysql.connection.user'),
        password : config.get('database.mysql.connection.password'),
        database : config.get('database.mysql.connection.database')
    }
});
module.exports = connection;