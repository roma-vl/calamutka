import useChat from 'hooks/useChat'
import MessageInput from './MessageInput/MessageInput'
import MessageList from './MessageList/MessageList'
import UserList from './UserList/UserList'
import {Grid} from "@material-ui/core";

export default function Room(user) {
  const {
    users,
    messages,
    log,
    sendMessage,
    removeMessage,
    roomID,
    setRoomID,
    getMessages,
    createRoom,
    getRooms, rooms, roomCreated
  } = useChat()
  return (
    <div className='container chat'>
      <Grid container>
        <Grid item xs={4}>
          <UserList user={user} users={users} setRoomID={setRoomID}
                    getMessages={getMessages} roomID={roomID}
                    createRoom={createRoom} getRooms={getRooms} rooms={rooms} roomCreated={roomCreated}/>
        </Grid>
        <Grid item xs={8}>
        {(roomID && messages) ? (
          <div className='container message'>
            <MessageList
              log={log}
              messages={messages}
              removeMessage={removeMessage}
            />
            <MessageInput sendMessage={sendMessage} roomId={roomID}/>
          </div>
        ) : (
          <div>Виберіть чат</div>
        )}

      </Grid>
      </Grid>
    </div>
  )
}
