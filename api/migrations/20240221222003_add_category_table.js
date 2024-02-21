export const up = function(knex) {
  return knex.schema.createTable('categories', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('slug').notNullable();
    table.text('description').nullable();
    table.integer('parent_id').unsigned().nullable().references('id').inTable('categories').onDelete('SET NULL');
    table.dateTime('deleted_at').nullable();
    table.timestamps(true, true);
  });
};

export const down = function(knex) {
  return knex.schema.dropTable('categories');
};
