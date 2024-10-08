/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export const up= function(knex) {
    return knex.schema.createTable('messages', function (table) {
        table.increments('id').primary();
        // table.integer('messageId').notNullable().unique();
        table.string('messageType').notNullable();
        table.string('textOrPathToFile').notNullable();
        table.integer('roomId').unsigned().notNullable();
        table.integer('userId').unsigned().notNullable();
        // table.string('userName').notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export const down = function(knex) {
    return knex.schema.dropTableIfExists('messages');
};
