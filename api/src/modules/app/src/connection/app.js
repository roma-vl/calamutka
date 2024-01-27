import config from '../../../../../config/config.js';
import knex from 'knex';

const connection = knex({
    client: config.database.mysql.client,
    connection: {
        host: config.database.mysql.connection.host,
        port: config.database.mysql.connection.port,
        user: config.database.mysql.connection.user,
        password: config.database.mysql.connection.password,
        database: config.database.mysql.connection.database
    }
});

export default connection;
