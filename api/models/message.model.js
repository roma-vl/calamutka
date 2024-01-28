// models/message.js
import knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../knexfile.js';

const tableName = 'messages';

class Message extends Model {
    static get tableName() {
        return tableName;
    }

    static async insertMessage(message) {
        console.log('Insert');
        return this.query().insert(message);
    }

    static async getMessagesByRoomId(roomId) {
        console.log(roomId);
        return this.query().where('roomId', roomId);
    }

    static async deleteMessage(messageId) {
        return this.query().where('messageId', messageId).delete();
    }
}

Model.knex(knex(knexConfig));

export default Message;
