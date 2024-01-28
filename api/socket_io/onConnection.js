import userHandlers from '../handlers/user.handlers.js'
import messageHandlers from '../handlers/message.handlers.js'

export default async function onConnection(io, socket) {
    try {
    // извлекаем идентификатор комнаты и имя пользователя
    const { roomId, userName } = socket.handshake.query
    // console.log(socket.handshake.query)
    // записываем их в объект сокета
    socket.roomId = roomId
    socket.userName = userName
    // присоединяемся к комнате
        await socket.join(roomId)

    // регистрируем обработчики для пользователей
   // await userHandlers(io, socket)

    // регистрируем обработчики для сообщений
   await messageHandlers(io, socket)
    } catch (error) {
        console.error('Error in onConnection:', error);
    }
}
