import UserHandlers from "./handlers/UserHandler.js";
import MessageHandlers from "./handlers/MessageHandler.js";

export default function onConnection(io, socket) {
  try {
    const userHandlers = new UserHandlers(io, socket);
    const messageHandlers = new MessageHandlers(io, socket);

    socket.on('user:add', async (user) => await userHandlers.handleUserAdd(user))

    socket.on('room:add', async (userFromId, userToId) => await userHandlers.handleRoomAdd(userFromId, userToId))
    socket.on('room:get', async (userId) => await userHandlers.handleRoomGet(userId))

    socket.on('message:get', async (room) => await messageHandlers.handleMessageGet(room))
    socket.on('message:add', async (message) =>  messageHandlers.handleMessageAdd(message));
    socket.on('message:remove', async (message) => messageHandlers.handleMessageRemove(message))

    socket.on('disconnect', async () => await userHandlers.handleDisconnect())

  } catch (error) {
    console.error('Error in onConnection:', error);
  }
}


