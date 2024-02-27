import RoomsRepository from "../repositories/UserRoomRepository.js";
import UserRepository from "../../users/repositories/UserRepository.js";

export default class UserHandler {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
    this.users = {};
    this.roomId = socket.roomId;
    this.userName = socket.userName;

    if (!this.users[this.roomId]) {
      this.users[this.roomId] = [];
    }
  }

  async updateUserListWithRoomId(roomId) {
    const _messages = await RoomsRepository.getUsersByRoomId(roomId);
    const users = await UserRepository.getUsersByIds(_messages);
    console.log(this.users, 'updateUserListWithRoomId')
    const userIdsAndUsernames = users.map(user => ({
      roomId: roomId,
      userId: user.id,
      userName: user.username,
    }));
    this.io.to(this.roomId).emit('user_list:update', userIdsAndUsernames);
  }

  async updateUserListWithSocketId(socketId) {
    const _messages = await RoomsRepository.getUsersBySocketId(socketId);
    const users = await UserRepository.getUsersByIds(_messages);

    const userIdsAndUsernames = users.map(user => ({
      roomId: socketId,
      userId: user.id,
      userName: user.first_name + ' ' + user.last_name,
    }));
    this.io.to(this.roomId).emit('user_list:update', userIdsAndUsernames);
  }
  async handleUserAdd(user) {
    this.socket.to(this.roomId).emit('log', ` ${this.userName} connected`);

    user.socketId = this.socket.id;
    const userData = {
      room_id: user.roomId,
      user_id: user.userId,
      socket_id: user.socketId
    }
    this.users[this.roomId] = await RoomsRepository.insertUserRoom(userData);
    await this.updateUserListWithRoomId(user.roomId);
  }

  async handleDisconnect() {
      this.socket.to(this.roomId).emit('log', `${this.userName} disconnected`);
    console.log(this.users, 'old')
      this.users = Object.fromEntries(
        Object.entries(this.users).filter(([key, value]) => value !== this.socket.id));
    console.log(this.users, 'new')
    await RoomsRepository.deleteUserRoom(this.socket.id);
      await this.updateUserListWithSocketId(this.socket.id);

  }
}
