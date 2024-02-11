// handlers/MessageHandlers.js
import Message from '../repositories/MessagesRepository.js';

class MessageHandlers {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  async updateMessageList(roomId) {
    const _messages = await Message.getMessagesByRoomId(roomId);
    this.io.to(roomId).emit('message_list:update', _messages);
  }

  handleMessageGet() {
    this.socket.on('message:get', async () => {
      try {
        await this.updateMessageList(this.socket.roomId);
      } catch (e) {
        console.error(e);
      }
    });
  }

  handleMessageAdd() {
    this.socket.on('message:add', async (message) => {
      try {
        await Message.insertMessage({ ...message, roomId: this.socket.roomId });
        await this.updateMessageList(this.socket.roomId);
      } catch (e) {
        console.error(e);
      }
    });
  }

  handleMessageRemove() {
    this.socket.on('message:remove', async (message) => {
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
    });
  }
}

export default MessageHandlers;
