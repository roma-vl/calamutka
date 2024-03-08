import UserRoomRepository from "../repositories/UserRoomRepository.js";
import UserRepository from "../../users/repositories/UserRepository.js";
import RoomsRepository from "../repositories/RoomsRepository.js";

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
    const _messages = await UserRoomRepository.getUsersByRoomId(roomId);
    const users = await UserRepository.getUsersByIds(_messages);
    const userIdsAndUsernames = users.map(user => ({
      roomId: roomId,
      userId: user.id,
      userName: user.username,
    }));
    this.io.to(this.roomId).emit('user_list:update', userIdsAndUsernames);
  }

  async updateUserListWithSocketId(socketId) {
    const _messages = await UserRoomRepository.getUsersBySocketId(socketId);
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
    await UserRoomRepository.insertUserRoom(userData);
    // await this.updateUserListWithRoomId(user.roomId);
  }

  async handleRoomAdd(userFrom, userTo) {
    const existingRoom = await RoomsRepository.findRoomByUsers(userFrom, userTo);

    if (existingRoom) {
      console.log('Room already exists:', existingRoom);
      this.socket.join(existingRoom.id);
      this.io.to(this.socket.id).emit('room_list:created', existingRoom.id);
      return existingRoom;
    }

    const roomData = {
      name: 'from_' + userFrom + '_to_' + userTo,
      user_from: userFrom,
      user_to: userTo
    }
    const room = await RoomsRepository.insertRoom(roomData);

    this.socket.join(room.id);
    this.io.to(this.socket.id).emit('room_list:created', room.id);
  }

  async handleRoomGet(userId) {
    try {
      const existingRooms = await RoomsRepository.findRoomByUserId(userId);
      const userIds = Array.from(new Set(existingRooms.flatMap(room => [room.user_from, room.user_to])));
      const otherUserIds = userIds.filter(id => id !== userId);
      const otherUsers = await UserRepository.getUsersByIds(otherUserIds);

      const formattedRooms = existingRooms.map(room => {
        const otherUser = otherUsers.find(user => user.id === room.user_from || user.id === room.user_to);
        const roomName = otherUser ? `${otherUser.first_name} ${otherUser.last_name}` : 'Збережене';
        const userImage = otherUser ? otherUser.profile_picture : '';
        const userId = otherUser ? otherUser.id : '';
        return {...room, roomName, userImage, userId};
      });

      this.io.to(this.socket.id).emit('room_list:update', formattedRooms);
    } catch (error) {
      console.error('Error in handleRoomGet:', error);
    }
  }

  async handleDisconnect() {
    this.socket.to(this.roomId).emit('log', `${this.userName} disconnected`);
    this.users = Object.fromEntries(
      Object.entries(this.users).filter(([key, value]) => value !== this.socket.id));
    // await UserRoomRepository.deleteUserRoom(this.socket.id);
    // await this.updateUserListWithSocketId(this.socket.id);

  }
}
