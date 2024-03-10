import {
  SET_LOG,
  SET_MESSAGES,
  SET_ROOM_CREATED,
  SET_ROOM_ID,
  SET_ROOMS,
  SET_NEW_MESSAGES,
  ADD_NEW_MESSAGE,
  REMOVE_NEW_MESSAGE,
} from "../actions/chatActions";

const initialState = {
  roomId: null,
  messages: [],
  newMessages: [],
  rooms: [],
  roomCreated: [],
  log: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOM_ID:
      return {...state, roomId: action.payload};
    case SET_MESSAGES:
      return {...state, messages: action.payload};
    case SET_NEW_MESSAGES:
      return { ...state, newMessages: action.payload };
    case ADD_NEW_MESSAGE:
      const newMessageId = action.payload.id;
      // Перевіряємо, чи існує повідомлення з таким же ідентифікатором
      const isDuplicate = state.newMessages.some(message => message.id === newMessageId);
      if (!isDuplicate) {
        // Якщо повідомлення ще не існує, додаємо його до масиву
        return { ...state, newMessages: [...state.newMessages, action.payload] };
      }
      // Якщо повідомлення вже існує, повертаємо поточний стан
      return state;
    case REMOVE_NEW_MESSAGE:
      return {
        ...state,
        newMessages: state.newMessages.filter(message => message.id !== action.payload)
      };
    case SET_ROOMS:
      return {...state, rooms: action.payload};
    case SET_ROOM_CREATED:
      return {...state, roomCreated: action.payload};
    case SET_LOG:
      return {...state, log: action.payload};
    default:
      return state;
  }
};

export default chatReducer;
