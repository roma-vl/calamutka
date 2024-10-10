export const up  = function(knex) {
  return knex.schema.createTable('messages_session', function(table) {
    table.increments('id').unsigned().primary(); // unsigned integer, primary key
    table.integer('user_id').unsigned().notNullable(); // unsigned integer для user_id
    table.string('session_id', 255).notNullable(); // varchar(255)
    table.datetime('expire').nullable(); // datetime
  });
};

export const down = function(knex) {
  return knex.schema.dropTableIfExists('messages_session');
};
