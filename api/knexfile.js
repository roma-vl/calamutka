// Update with your config settings.

/**
 * @type {Config|{}}
 */

import config from './config/config.js';

export default {

  client: config.database.mysql.client,
  connection: {
    host: config.database.mysql.connection.host,
    port: config.database.mysql.connection.port,
    user: config.database.mysql.connection.user,
    password: config.database.mysql.connection.password,
    database: config.database.mysql.connection.database
  },
  seeds: {
    directory: './seeds'
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
