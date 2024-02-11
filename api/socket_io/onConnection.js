import userHandlers from '../handlers/user.handlers.js'
import messageHandlers from '../handlers/message.handlers.js'
import MessageHandlers from "../src/modules/messages/handlers/MessageHandler.js";
import UserHandlers from "../src/modules/messages/handlers/UserHandler.js";

export default  function onConnection(io, socket) {
    try {
        const { roomId, userName } = socket.handshake.query

        socket.roomId = roomId
        socket.userName = userName

        socket.join(roomId)

        userHandlers(io, socket)
        messageHandlers(io, socket)


        // const userHandlers = new UserHandlers(io, socket);
        // const messageHandlers = new MessageHandlers(io, socket);
        // //
        // userHandlers.handleUserAdd();
        // userHandlers.handleDisconnect();
        // messageHandlers.handleMessageGet();
        // messageHandlers.handleMessageAdd();
        // messageHandlers.handleMessageRemove();
    } catch (error) {
        console.error('Error in onConnection:', error);
    }
}
