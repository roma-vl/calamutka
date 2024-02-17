/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('products', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('quantity').defaultTo(1);
    table.text('description').nullable();
    table.decimal('price', 10, 2).notNullable();
    table.string('main_image').nullable();
    table.dateTime('deleted_at').nullable();
    table.timestamps(true, true);
  });
};

export const down = function(knex) {
  return knex.schema.dropTable('products');
};
