export const up = function(knex) {
  return knex.schema.table('messages', function(table) {
    table.foreign('roomId').references('rooms.id').onUpdate('CASCADE');
    // table.foreign('userId').references('users.id').onUpdate('CASCADE');
  });
};

export const down = function(knex) {
  return knex.schema.table('messages', function(table) {
    table.dropForeign('roomId');
    // table.dropForeign('userId');
  });
};
