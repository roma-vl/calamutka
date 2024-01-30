/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.alterTable('users', function (table) {
        table.string('first_name');
        table.string('last_name');
        table.string('email').unique().notNullable();
        table.string('address');
        table.string('phone');
        table.date('birthdate');
        table.string('gender');
        table.string('profile_picture');
        table.dateTime('last_login');
        table.string('role');
        table.string('account_status');
        table.string('social_media_links');
        table.text('bio');
        table.string('language');
        table.boolean('is_blocked').defaultTo(false);
        table.dateTime('blocked_until').nullable();
        // table.dateTime('created_at').defaultTo(knex.fn.now());
        // table.dateTime('updated_at').defaultTo(knex.fn.now());
        table.dateTime('deleted_at').nullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.table('users', function (table) {
        table.dropColumn('first_name');
        table.dropColumn('last_name');
        table.dropColumn('email');
        table.dropColumn('address');
        table.dropColumn('phone');
        table.dropColumn('birthdate');
        table.dropColumn('gender');
        table.dropColumn('profile_picture');
        table.dropColumn('last_login');
        table.dropColumn('role');
        table.dropColumn('account_status');
        table.dropColumn('social_media_links');
        table.dropColumn('bio');
        table.dropColumn('language');
        table.dropColumn('is_blocked');
        table.dropColumn('blocked_until');
        table.dropColumn('created_at');
        table.dropColumn('updated_at');
        table.dropColumn('deleted_at');


    });
};
