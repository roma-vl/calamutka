import {Model} from 'objection';
import knex from '../../app/src/connection/app.js'

Model.knex(knex)
export class User extends Model {
  static get tableName() {
    return 'users';
  }

  static async getUsers(page = 1, pageSize = 3) {
    const offset = (page - 1) * pageSize;
    return await this.query().offset(offset).limit(pageSize);
  }

  static async getUserById(id) {
    return await this.query().findById(id);
  }

  static async createUser(userData) {
    return await this.query().insert(userData);
  }

  static async updateUserById(id, userData) {
    return await this.query().findById(id).patch(userData);
  }

  static async deleteUserById(id) {
    return await this.query().deleteById(id);
  }
}
