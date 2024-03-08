import Message from '../models/Message.js';

class MessageRepository {
  static async insertMessage(message) {
    return await Message.query().insert(message);
  }

  static async getMessagesByRoomId(roomId) {
    return await Message.query().where('roomId', roomId);
  }

  static async deleteMessage(id) {
    return await Message.query().where('id', id).delete();
  }
}

export default MessageRepository;
