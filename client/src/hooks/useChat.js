import {SERVER_URL, USER_KEY} from 'constants.js'
import {useEffect, useMemo, useRef, useState} from 'react'
import {io} from 'socket.io-client'
import {useSelector} from "react-redux";

export default function useChat() {
  const user = useSelector(state => state.user.userData);

  const [users, setUsers] = useState([])
  const [roomID, setRoomID] = useState(null)
  const [messages, setMessages] = useState(null)
  const [rooms, setRooms] = useState([])
  const [roomCreated, setRoomCreated] = useState([])
  const [log, setLog] = useState(null)

  const {current: socket} = useRef(
    io(SERVER_URL, {
      path: '',
      query: {
        userName: user.username
      },
      auth: {
        user : user.id
      },
      autoConnect: true,
      transports: ['websocket'],
    })
  )
  useEffect(() => {
    if (!user) return;
    socket.on('connect', () => {
      console.log('Socket connected!');
    });

    socket.on('log', (log) => {
      setLog(log)
    })

    socket.on('message_list:update', (messages) => {
      setMessages(messages)
    })
    socket.on('room_list:update', (rooms) => {
      setRooms(rooms)
    })
    socket.on('room_list:created', (roomCreated) => {
      setRoomID(roomCreated.id)
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
    users,
    messages,
    log,
    sendMessage,
    removeMessage,
    roomID,
    setRoomID,
    getMessages,
    createRoom,
    getRooms,
    rooms,
    roomCreated
  }
}
