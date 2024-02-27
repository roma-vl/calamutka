import Rooms from '../models/Rooms.js';
class RoomsRepository {
  static async insertRoom(room) {
    return await Rooms.query().insert(room);
  }

  static async getByRoomId(roomId) {
    console.log(roomId);
    return await Rooms.query().where('id', roomId);
  }

  static async deleteRoom(roomId) {
    return await Rooms.query().where('id', roomId).delete();
  }
}

export default RoomsRepository;
