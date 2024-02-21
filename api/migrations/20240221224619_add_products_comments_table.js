export const up = function(knex) {
  return knex.schema.createTable('product_comments', function(table) {
    table.increments('id').primary();
    table.integer('product_id').unsigned().notNullable().references('id').inTable('products').onDelete('CASCADE');
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('content').notNullable();
    table.boolean('is_moderate').defaultTo(false);
    table.boolean('is_visible').defaultTo(true);
    table.boolean('author_id').defaultTo(false);
    table.integer('parent_comment_id').unsigned().references('id').inTable('product_comments').onDelete('CASCADE');
    table.enu('type', ['user', 'moderator']).notNullable().defaultTo('user');
    table.integer('rating').defaultTo(0);
    table.integer('votes').defaultTo(0);
    table.timestamps(true, true);
    table.dateTime('deleted_at').nullable();
  });
};

export const down = function(knex) {
  return knex.schema.dropTable('comments');
};
