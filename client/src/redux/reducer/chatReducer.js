import {SET_LOG, SET_MESSAGES, SET_ROOM_CREATED, SET_ROOM_ID, SET_ROOMS, SET_USERS} from "../actions/chatActions";

const initialState = {
  roomId: null,
  messages: [],
  rooms: [],
  roomCreated: [],
  log: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOM_ID:
      return { ...state, roomId: action.payload };
    case SET_MESSAGES:
      return { ...state, messages: action.payload };
    case SET_ROOMS:
      return { ...state, rooms: action.payload };
    case SET_ROOM_CREATED:
      return { ...state, roomCreated: action.payload };
    case SET_LOG:
      return { ...state, log: action.payload };
    default:
      return state;
  }
};

export default chatReducer;
