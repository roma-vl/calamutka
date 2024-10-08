import {SERVER_URI} from 'constants.js'
import {useEffect, useMemo, useRef} from 'react'
import {io} from 'socket.io-client'
import {useDispatch, useSelector} from "react-redux";
import {setLog, setMessages, addNewMessage, setRoomId, setRooms} from "../redux/actions/chatActions";

export default function useChat() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userData);
  const session_id = localStorage.getItem("session_id");
  const {current: socket} = useRef(
    io(SERVER_URI, {
      path: '',
      query: {
        userName: user.username
      },
      auth: {
        user : user.id,
        auth : session_id
      },
      autoConnect: true,
      transports: ['websocket'],
    })
  )
  useEffect(() => {
    if (!user) return;
    socket.on('connect', () => console.log('Socket connected!'))
    socket.emit('connection', user.id, session_id)
    socket.on('connections', (connection) => {
      if (connection.session_id) {
        localStorage.setItem("session_id" ,connection.session_id)
      }
    })
    socket.on('log', (log) => dispatch(setLog(log)))
    socket.on('message_list:update', (messages) => dispatch(setMessages(messages)))
    socket.on('message_list:new_message', (message) => dispatch(addNewMessage(message)))
    socket.on('room_list:update', (rooms) =>  dispatch(setRooms(rooms)))

    socket.on('room_list:created', (roomCreated) => {
      dispatch(setRoomId(roomCreated))
      getRooms(user.id);
      getMessages({roomId: roomCreated.id});
    })

  }, [])

  const createRoom = useMemo(() => (userFromId, userToId) => socket.emit('room:add', userFromId, userToId), [socket]);
  const getRooms = useMemo(() => (userId) => socket.emit('room:get', userId), [socket]);
  const getMessages = useMemo(() => (room) => socket.emit('message:get', room), [socket])
  const sendMessage = useMemo(() => (message) => socket.emit('message:add', message), [socket]);
  const removeMessage = useMemo(() => (message) => socket.emit('message:remove', message), [socket]);

  return {
    sendMessage,
    removeMessage,
    getMessages,
    createRoom,
    getRooms,
  }
}
