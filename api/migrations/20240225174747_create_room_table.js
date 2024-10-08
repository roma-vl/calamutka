export const up = function(knex) {
  return knex.schema.createTable('rooms', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.integer('user_from').unsigned().notNullable();
    table.integer('user_to').unsigned().notNullable();

  });
};

export const down = function(knex) {
  return knex.schema.dropTable('rooms');
};

