export const up = function(knex) {
  return knex.schema.table('products', function(table) {
    table.integer('category_id').unsigned().nullable().references('id').inTable('categories').onDelete('SET NULL');
  });
};

export const down = function(knex) {
  return knex.schema.table('products', function(table) {
    table.dropForeign('category_id');
    table.dropColumn('category_id');
  });
};
