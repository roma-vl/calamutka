// Змініть імпорт наступним чином
import Message from '../models/message.model.js';

const updateMessageList = async (io, roomId) => {
    const _messages = await Message.getMessagesByRoomId(roomId);
    io.to(roomId).emit('message_list:update', _messages);
};

export default async function messageHandlers(io, socket) {
    const { roomId } = socket;

    socket.on('message:get', async () => {
        try {
            await updateMessageList(io, roomId);
        } catch (e) {
            console.error(e);
        }
    });

    socket.on('message:add', async (message) => {
        try {
            await Message.insertMessage({ ...message, roomId });
            await updateMessageList(io, roomId);
        } catch (e) {
            console.error(e);
        }
    });

    socket.on('message:remove', async (message) => {
        const { messageId, messageType, textOrPathToFile } = message;

        try {
            await Message.deleteMessage(messageId);

            if (messageType !== 'text') {
                // Реалізуйте вашу логіку видалення файлу
            }

           await updateMessageList(io, roomId);
        } catch (e) {
            console.error(e);
        }
    });
}
