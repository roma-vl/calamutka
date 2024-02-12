import {SERVER_URL, USER_KEY} from 'constants.js'
import {useEffect, useMemo, useRef, useState} from 'react'
import {io} from 'socket.io-client'
import storage from 'utils/storage'

export default function useChat() {
  let user = storage.get(USER_KEY)
  if (!user) user = 'main_room'
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [log, setLog] = useState(null)

  const {current: socket} = useRef(
    io(SERVER_URL, {
      path: '',
      query: {
        roomId: user.roomId,
        userName: user.userName
      },
      transports: ['websocket'],
    })
  )

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected!');
    });

    socket.emit('user_add', user)
    socket.emit('message:get')

    socket.on('log', (log) => {
      setLog(log)
    })

    socket.on('user_list:update', (users) => {
      setUsers(users)
    })

    socket.on('message_list:update', (messages) => {
      setMessages(messages)
    })

  }, [])

  const sendMessage = useMemo(() => (message) => socket.emit('message:add', message), [socket]);
  const removeMessage = useMemo(() => (message) => socket.emit('message:remove', message), [socket]);

  return {users, messages, log, sendMessage, removeMessage}
}
