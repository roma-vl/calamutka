import useChat from 'hooks/useChat'
import MessageInput from './MessageInput/MessageInput'
import MessageList from './MessageList/MessageList'
import UserList from './UserList/UserList'
import {Grid} from "@material-ui/core";
import {useSelector} from "react-redux";

export default function Room(user) {

  const chat = useSelector(state => state.chat);
  const {sendMessage, removeMessage, getMessages, createRoom, getRooms} = useChat()
  return (
    <div className='container chat'>
      <Grid container>
        <Grid item xs={4}>
          <UserList
            user={user}
            getMessages={getMessages}
            createRoom={createRoom}
            getRooms={getRooms}
            rooms={chat.rooms}
            roomId={chat.roomId}/>
        </Grid>
        <Grid item xs={8}>
          {(chat.roomId && chat.messages) ? (
            <div className='container message'>
              <MessageList
                log={chat.log}
                messages={chat.messages}
                removeMessage={removeMessage}
              />
              <MessageInput sendMessage={sendMessage} roomId={chat.roomId}/>
            </div>
          ) : (
            <div>Виберіть чат</div>
          )}

        </Grid>
      </Grid>
    </div>
  )
}
