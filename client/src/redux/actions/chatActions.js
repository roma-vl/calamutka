
export const SET_ROOM_ID = 'SET_ROOM_ID';
export const SET_MESSAGES = 'SET_MESSAGES';
export const SET_NEW_MESSAGES = 'SET_NEW_MESSAGES';
export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';
export const REMOVE_NEW_MESSAGE = 'REMOVE_NEW_MESSAGE';
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

export const setNewMessages = (messages) => ({
  type: SET_NEW_MESSAGES,
  payload: messages,
});
export const addNewMessage = (message) => ({
  type: ADD_NEW_MESSAGE,
  payload: message,
});

export const removeNewMessage = (messageId) => ({
  type: REMOVE_NEW_MESSAGE,
  payload: messageId,
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
