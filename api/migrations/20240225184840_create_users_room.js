export const up  = function(knex) {
  return knex.schema.createTable('user_room', function(table) {
    table.integer('user_id');
    table.integer('room_id');
    // other fields if needed
    // table.foreign('user_id').references('users.id');
    table.foreign('room_id').references('rooms.id');
  });
};

export const down = function(knex) {
  return knex.schema.dropTableIfExists('user_room');
};
