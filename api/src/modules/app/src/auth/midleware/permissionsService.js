import knex from '../../connection/app.js';

export async function getUserPermissions(userId) {
  const userRoles = await knex('users')
    .where('users.id', userId)
    .join('roles', 'users.role_id', '=', 'roles.id')
    .select('roles.id as role_id');

  const permissions = await Promise.all(userRoles.map(async (role) => {
    const rolePermissions = await knex('role_permissions')
      .where('role_id', role.role_id)
      .join('permissions', 'role_permissions.permission_id', '=', 'permissions.id')
      .select('permissions.name');

    return rolePermissions.map((permission) => permission.name);
  }));

  return permissions.flat();
}
