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
    await this.updateUserListWithRoomId(user.roomId);
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
    const existingRoom = await RoomsRepository.findRoomByUserId(userId);

    const users = existingRoom.map(room => [room.user_from, room.user_to]);
    // const uniqueUsers = new Set(users.flat());
    let uniqueUsersArray = Array.from(new Set(users.flat()));
    uniqueUsersArray = uniqueUsersArray.filter(id => id !== userId);
    const usersq = await UserRepository.getUsersByIds(uniqueUsersArray);
    const formattedRooms = existingRoom.map(room => {
      const user = usersq.find(user => user.id === room.user_from || user.id === room.user_to);

      const roomName = user ? user.first_name + ' ' + user.last_name : 'Збережене';
      const userImage = user ? user.profile_picture : '';
      const userId = user ? user.id : '';
      return {...room, roomName, userImage, userId};
    });
    this.io.to(this.socket.id).emit('room_list:update', formattedRooms);
  }

  async handleDisconnect() {
    this.socket.to(this.roomId).emit('log', `${this.userName} disconnected`);
    this.users = Object.fromEntries(
      Object.entries(this.users).filter(([key, value]) => value !== this.socket.id));
    await UserRoomRepository.deleteUserRoom(this.socket.id);
    await this.updateUserListWithSocketId(this.socket.id);

  }
}
