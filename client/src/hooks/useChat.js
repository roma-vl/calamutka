import { SERVER_URI, USER_KEY } from 'constants'
import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import storage from 'utils/storage'

export default function useChat() {
    // извлекаем данные пользователя из локального хранилища
    const user = storage.get(USER_KEY)
    // локальное состояние для списка пользователей
    const [users, setUsers] = useState([])
    // локальное состояние для списка сообщений
    const [messages, setMessages] = useState([])
    // состояние для системного сообщения
    const [log, setLog] = useState(null)
    // иммутабельное состояние для сокета
    const { current: socket } = useRef(
        io('api.calamutka.com', {
            // io('http://localhost:4000', {
            path: '',
            query: {
                roomId: user.roomId,
                userName: user.userName
            },
            transports: ['websocket'],
        })
    )

    // регистрируем обработчики
    useEffect(() => {
        console.log('Socket connecting...');
        socket.on('connect', () => {
            console.log('Socket connected!');
        });


        // сообщаем о подключении нового пользователя
        socket.emit('user_add', user)
        console.log(user, 'dsfdsf dsf sdf sdf ')
        // запрашиваем сообщения из БД
        socket.emit('message:get')

        // обрабатываем получение системного сообщения
        socket.on('log', (log) => {
            console.log('логер')
            setLog(log)
        })

        // обрабатываем получение обновленного списка пользователей
        socket.on('user_list:update', (users) => {
            setUsers(users)
        })

        // обрабатываем получение обновленного списка сообщений
        socket.on('message_list:update', (messages) => {
            setMessages(messages)
        })

    }, [])

    // метод для отправки сообщения
    const sendMessage = (message) => {
        console.log(message)
        socket.emit('message:add', message)
    }

    // метод для удаления сообщения
    const removeMessage = (message) => {
        socket.emit('message:remove', message)
    }

    return { users, messages, log, sendMessage, removeMessage }
}