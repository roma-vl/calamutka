import User from '../models/User.js';

export default class UserRepository {
  static async getAllUsers() {
    return await User.query();
  }

  static async getUserById(id) {
    return await User.query().findById(id);
  }

  static async createUser(userData) {
    return await User.query().insert(userData);
  }

  static async updateUserById(id, userData) {
    return await User.query().findById(id).patch(userData);
  }

  static async deleteUserById(id) {
    return await User.query().deleteById(id);
  }

  static async getUsersByIds(ids) {
    try {
      return await User.query().whereIn('id', ids);
    } catch (error) {
      console.error('Помилка при отриманні користувачів за ідентифікаторами:', error);
      return [];
    }
  }

  static async findUserByUserName(username) {
    return await User.query().where('username', 'LIKE', `%${username}%`);
  }

  static async findUserByEmail(email) {
    return await User.query().where('email', 'LIKE', `%${email}%`);
  }
}
