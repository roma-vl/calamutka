import UserHandler from './handlers/UserHandler.js'
import MessageHandler from './handlers/MessageHandler.js'
import UserHandlers from "./handlers/UserHandler.js";
import MessageHandlers from "./handlers/MessageHandler.js";
import RoomsRepository from "./repositories/UserRoomRepository.js";

export default function onConnection(io, socket) {
  try {
    const { roomId, userName } = socket.handshake.query

    socket.roomId = roomId
    socket.userName = userName


    socket.join(roomId)

    const userHandlers = new UserHandlers(io, socket);
    const messageHandlers = new MessageHandlers(io, socket);

    socket.on('user_add', async (user) => await userHandlers.handleUserAdd(user))

    socket.on('message:get', async () => await messageHandlers.handleMessageGet())
    socket.on('message:add', async (message) =>  messageHandlers.handleMessageAdd(message));
    socket.on('message:remove', async (message) => messageHandlers.handleMessageRemove(message))

    socket.on('disconnect', async () => await userHandlers.handleDisconnect())

  } catch (error) {
    console.error('Error in onConnection:', error);
  }
}


