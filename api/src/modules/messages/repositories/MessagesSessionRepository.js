import MessagesSession from '../models/MessagesSession.js';

export default class MessagesSessionRepository {
 static async create({userId, session_id}) {
   // console.log(userId, sessionId, 'userId, sessionIduserId, sessionIduserId, sessionId')
    // Перевірка наявності запису з вказаними userId та sessionId
    const existingSession = await MessagesSession.query().findOne({ user_id: userId });

   // console.log(existingSession, 'existingSession')

    // Якщо запис існує, повертаємо його
    if (existingSession) {
      console.log('yes')
      return existingSession;
    }
   console.log('no')
    // Якщо запису не існує, створюємо новий запис
    return await MessagesSession.query().insert({ user_id: userId, session_id: session_id });
  }

  static async updateById(id, data) {
    return await MessagesSession.query().findById(id).patch(data);
  }

  static async deleteById(id) {
    return await MessagesSession.query().deleteById(id);
  }

  static async findByUserId(userId) {
    return await MessagesSession.query().where('user_id', userId);
  }
}
