import Message from '../repositories/MessagesRepository.js';

class MessageHandler {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  async updateMessageList(roomId) {
    const _messages = await Message.getMessagesByRoomId(roomId);
    this.io.to(roomId).emit('message_list:update', _messages);
  }

  async handleMessageGet() {
      try {
        await this.updateMessageList(this.socket.roomId);
      } catch (e) {
        console.error(e);
      }
  }

  async handleMessageAdd(message) {
      try {
        await Message.insertMessage({ ...message, roomId: this.socket.roomId });
        await this.updateMessageList(this.socket.roomId);
      } catch (e) {
        console.error(e);
      }
  }

  async handleMessageRemove(message) {
      const { messageId, messageType } = message;

      try {
        await Message.deleteMessage(messageId);

        if (messageType !== 'text') {
          // Реалізуйте вашу логіку видалення файлу
        }

        await this.updateMessageList(this.socket.roomId);
      } catch (e) {
        console.error(e);
      }
  }
}
export default MessageHandler;
