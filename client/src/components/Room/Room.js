import useChat from 'hooks/useChat'
import MessageInput from './MessageInput/MessageInput'
import MessageList from './MessageList/MessageList'
import UserList from './UserList/UserList'
import {Grid} from "@material-ui/core";
import Container from "@mui/material/Container";

export default function Room() {
  const {users, messages, log, sendMessage, removeMessage} = useChat()
  return (
    <div className='container chat'>
     <Grid container>
       <Grid item xs={4}>
         <UserList users={users}/>
       </Grid>
       <Grid item xs={8}>
         <div className='container message'>
           <MessageList
             log={log}
             messages={messages}
             removeMessage={removeMessage}
           />
           <MessageInput sendMessage={sendMessage}/>
         </div>
       </Grid>
     </Grid>
    </div>
  )
}
