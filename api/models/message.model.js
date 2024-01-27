// models/message.js
import knex from 'knex';
import { Model } from 'objection';

import  knexConfig from '../knexfile.js';

const knexInstance = knex(knexConfig);
Model.knex(knexInstance);

class Message extends Model {
    static get tableName() {
        return 'messages';
    }
}

export default Message;
