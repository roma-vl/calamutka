/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('messages', function (table) {
        table.increments('id').primary();
        table.string('messageId').notNullable().unique();
        table.string('messageType').notNullable();
        table.string('textOrPathToFile').notNullable();
        table.string('roomId').notNullable();
        table.string('userId').notNullable();
        table.string('userName').notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('messages');
};
