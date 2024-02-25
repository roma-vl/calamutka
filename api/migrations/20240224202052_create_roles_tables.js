export const up = function(knex) {
  return knex.schema.createTable('roles', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.timestamps(true, true);
  })
    .createTable('permissions', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.timestamps(true, true);
    })
    .createTable('role_permissions', function(table) {
      table.integer('role_id').unsigned().references('id').inTable('roles');
      table.integer('permission_id').unsigned().references('id').inTable('permissions');
      table.primary(['role_id', 'permission_id']);
      table.timestamps(true, true);
    });
};

export const down = function(knex) {
  return knex.schema
    .dropTable('role_permissions')
    .dropTable('permissions')
    .dropTable('roles');
};

