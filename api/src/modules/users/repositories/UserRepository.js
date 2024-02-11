
import User from '../models/User.js';
import UserRepositoryInterface from "./UserRepositoryInterface.js";

export default class UserRepository extends UserRepositoryInterface {
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

  static async searchUsers(criteria) {
    // Реалізуйте логіку пошуку користувачів на основі заданих критеріїв
  }
}
