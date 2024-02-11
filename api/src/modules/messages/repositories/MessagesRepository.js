// repositories/MessageRepository.js
import Message from '../models/Message.js';

class MessageRepository {
  static async insertMessage(message) {
    return await Message.query().insert(message);
  }

  static async getMessagesByRoomId(roomId) {
    console.log(roomId);
    return await Message.query().where('roomId', roomId);
  }

  static async deleteMessage(messageId) {
    return await Message.query().where('messageId', messageId).delete();
  }
}

export default MessageRepository;
