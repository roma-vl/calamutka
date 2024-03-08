import UserRoom from '../models/UserRoom.js';
class RoomsRepository {
  static async insertUserRoom(userRoomData) {
    return await UserRoom.query().insert(userRoomData);
  }

  static async deleteUserRoom( socket_id) {
    return await UserRoom.query().where('socket_id', '=', socket_id).delete();
  }

  static async getUsersByRoomId(room_id) {
    try {
      const users = await UserRoom.query()
        .distinct('user_id')
        .where('room_id', '=', room_id);
      return users.map(user => user.user_id);
    } catch (error) {
      console.error('Помилка при отриманні user_id:', error);
      return [];
    }
  }

  static async getUsersBySocketId(socket_id) {
    try {
      const users = await UserRoom.query()
        .distinct('user_id')
        .where('socket_id', '=', socket_id);
      return users.map(user => user.user_id);
    } catch (error) {
      console.error('Помилка при отриманні user_id:', error);
      return [];
    }
  }
}

export default RoomsRepository;
