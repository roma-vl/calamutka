import {Model} from 'objection';
import knex from '../../app/src/connection/app.js'

Model.knex(knex)

export default class Message extends Model {
  static get tableName() {
    return 'rooms';
  }

}
