import Rooms from '../models/Rooms.js';
class RoomsRepository {
  static async insertRoom(room) {
    return await Rooms.query().insert(room);
  }

  static async findRoomByUsers(userFrom, userTo) {
    return await Rooms.query()
      .where(builder => {
        builder.where('user_from', userFrom).andWhere('user_to', userTo)
          .orWhere('user_from', userTo).andWhere('user_to', userFrom);
      })
      .first();
  }

  static async findRoomByUserId(userId) {
    return await Rooms.query().where('user_from', userId).orWhere('user_to', userId);
  }

  static async getByRoomId(roomId) {
    return await Rooms.query().where('id', roomId);
  }

  static async deleteRoom(roomId) {
    return await Rooms.query().where('id', roomId).delete();
  }
}

export default RoomsRepository;
