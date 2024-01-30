import {useState} from 'react';
import {Box, Paper, Button} from '@mui/material';
import useChat from "../../hooks/useChat";
import MessageList from "../Room/MessageList/MessageList";
import MessageInput from "../Room/MessageInput/MessageInput";

const ChatWindow = ({onClose}) => {
  const [width, setWidth] = useState(350);
  const [height, setHeight] = useState(550);

  const handleResize = (e, direction, ref, d) => {
    if (ref && ref.style) {
      setWidth(ref.style.width);
      setHeight(ref.style.height);
    }
  };

  const {users, messages, log, sendMessage, removeMessage} = useChat();

  return (
    <Paper
      elevation={4}
      sx={{
        width,
        height,
        position: 'fixed',
        bottom: 10,
        right: 70,
        padding: 1,
        display: 'flex',
        flexDirection: 'column',
        resize: 'both',
        overflow: 'auto'
      }}
      onResize={handleResize}
    >
      <Box sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        paddingLeft: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <p>Месенджер</p> <p>{log}</p>
        <Button onClick={onClose} variant="contained" sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          minWidth: 'fit-content',
          padding: '8px 12px',
          width: '15%',
          marginRight: 1
        }}>Х</Button>
      </Box>
      <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column-reverse', overflowY: 'auto', gap: 1, marginBottom: 1}}>
        <MessageList
          log={log}
          messages={messages}
          removeMessage={removeMessage}
        />
      </Box>
      <MessageInput sendMessage={sendMessage}/>
    </Paper>
  );
};

export default ChatWindow;
