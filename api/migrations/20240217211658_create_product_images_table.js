/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('product_images', function(table) {
    table.increments('id').primary();
    table.integer('product_id').unsigned().notNullable();
    table.string('url').notNullable();
    table.text('description').nullable();

    table.foreign('product_id').references('id').inTable('products');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('product_images');
};
