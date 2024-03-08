import {SERVER_URL, USER_KEY} from 'constants.js'
import {useEffect, useMemo, useRef, useState} from 'react'
import {io} from 'socket.io-client'
import {useDispatch, useSelector} from "react-redux";
import {setLog, setMessages, setRoomCreated, setRoomId, setRooms} from "../redux/actions/chatActions";

export default function useChat() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userData);

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
    socket.on('connect', () => console.log('Socket connected!'))
    socket.on('log', (log) => dispatch(setLog(log)))
    socket.on('message_list:update', (messages) => dispatch(setMessages(messages)))
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
