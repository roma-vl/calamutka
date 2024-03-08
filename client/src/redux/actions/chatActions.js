
export const SET_ROOM_ID = 'SET_ROOM_ID';
export const SET_MESSAGES = 'SET_MESSAGES';
export const SET_ROOMS = 'SET_ROOMS';
export const SET_ROOM_CREATED = 'SET_ROOM_CREATED';
export const SET_LOG = 'SET_LOG';

export const setRoomId = (roomId) => ({
  type: SET_ROOM_ID,
  payload: roomId,
});

export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});

export const setRooms = (rooms) => ({
  type: SET_ROOMS,
  payload: rooms,
});

export const setRoomCreated = (roomCreated) => ({
  type: SET_ROOM_CREATED,
  payload: roomCreated,
});

export const setLog = (log) => ({
  type: SET_LOG,
  payload: log,
});
