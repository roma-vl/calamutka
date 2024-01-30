import userHandlers from '../handlers/user.handlers.js'
import messageHandlers from '../handlers/message.handlers.js'

export default  function onConnection(io, socket) {
    try {
        const { roomId, userName } = socket.handshake.query

        socket.roomId = roomId
        socket.userName = userName

        socket.join(roomId)

        userHandlers(io, socket)
        messageHandlers(io, socket)
    } catch (error) {
        console.error('Error in onConnection:', error);
    }
}
