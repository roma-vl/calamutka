export const up = function(knex) {
  return knex.schema.createTable('rooms', function(table) {
    table.increments('id').primary();
    table.string('name');

  });
};

export const down = function(knex) {
  return knex.schema.dropTable('rooms');
};

