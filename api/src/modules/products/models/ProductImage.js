import {Model} from 'objection';
import knex from '../../app/src/connection/app.js'

Model.knex(knex)
export default class ProductImage extends Model {
  static get tableName() {
    return 'product_images';
  }

}
