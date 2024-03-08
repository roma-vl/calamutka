import Message from '../repositories/MessagesRepository.js';
import RoomsRepository from "../repositories/RoomsRepository.js";
import UserRepository from "../../users/repositories/UserRepository.js";

class MessageHandler {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  async updateMessageList(roomId) {
    const messages = await Message.getMessagesByRoomId(roomId);
    const room = await RoomsRepository.getByRoomId(roomId);
    const users = await UserRepository.getUsersByIds( [room[0].user_from, room[0].user_to],);

    const formattedMessages = messages.map(message => {
      const user = users.find(user => user.id === message.userId);
      const authorName = user ? user.first_name + ' ' + user.last_name : 'Збережене';
      return {...message, authorName};
    });

    this.socket.join(roomId);
    this.io.to(this.socket.id).emit('message_list:update', formattedMessages);
    this.io.to(roomId).emit('message_list:update', formattedMessages);
  }

  async handleMessageGet(room) {
      try {
        await this.updateMessageList( room.roomId);
      } catch (e) {
        console.error(e);
      }
  }

  async handleMessageAdd(message) {
      try {
        await Message.insertMessage({ ...message });
        await this.updateMessageList(message.roomId);
      } catch (e) {
        console.error(e);
      }
  }

  async handleMessageRemove(message) {
      const { id, messageType } = message;
      try {
        await Message.deleteMessage(id);
        if (messageType !== 'text') {
          // Реалізуйте вашу логіку видалення файлу
        }

        await this.updateMessageList(message.roomId);
      } catch (e) {
        console.error(e);
      }
  }
}
export default MessageHandler;
