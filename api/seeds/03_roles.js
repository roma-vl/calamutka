// export const seed  = function(knex) {
//   // Deletes ALL existing entries
//   return knex('roles').delete()
//     .then(function () {
//       // Inserts seed entries
//       return knex('roles').insert([
//         { name: 'admin' },
//         { name: 'moderator' },
//         { name: 'user' }
//       ]);
//     });
// };

export const seed = function(knex) {
  return knex.transaction(async (trx) => {
    try {
      // Deletes ALL existing entries
      await trx('role_permissions').delete();
      await trx('permissions').delete();
      await trx('roles').delete();
      // Inserts seed entries for permissions
      await trx('permissions').insert([
        { name: 'create_product' },
        { name: 'edit_product' },
        { name: 'delete_product' },
        // Додайте інші привілегії за потребою
      ]);

      // Deletes ALL existing entries


      // Inserts seed entries for roles
      await trx('roles').insert([
        { name: 'admin' },
        { name: 'moderator' },
        { name: 'user' },
      ]);

      // Deletes ALL existing entries


      // Inserts seed entries for role_permissions
      await trx('role_permissions').insert([
        { role_id: 1, permission_id: 1 }, // Приклад: роль "admin" має привілегію "create_product"
        { role_id: 1, permission_id: 2 }, // Приклад: роль "admin" має привілегію "edit_product"
        { role_id: 1, permission_id: 3 }, // Приклад: роль "admin" має привілегію "delete_product"
        { role_id: 2, permission_id: 1 }, // Приклад: роль "moderator" має привілегію "create_product"
        { role_id: 2, permission_id: 2 }, // Приклад: роль "moderator" має привілегію "edit_product"
        { role_id: 3, permission_id: 1 }, // Приклад: роль "user" має привілегію "create_product"
        // Додайте інші привілегії для ролей за потребою
      ]);
    } catch (error) {
      console.error('Error seeding data:', error);
      throw error; // Повертаємо помилку для того, щоб транзакція була відкочена
    }
  });
};
