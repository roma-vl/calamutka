import {Fragment} from 'react';
import MessageItem from './MessageItem';
import {Paper} from '@mui/material';

export default function MessageList({messages, removeMessage}) {

  return (
    <Fragment>
      {messages && messages.slice().reverse().map((message, index) => (

        <Paper key={index} elevation={1} sx={{
          padding: 1,
          borderRadius: 1,
          minWidth: '90%',
          maxWidth: '90px',
          alignSelf: message.id % 2 === 1 ? 'flex-end' : 'flex-start',
          backgroundColor: message.id % 2 === 1 ? 'primary.light' : 'background.paper',
          color: message.id % 2 === 1 ? 'white' : 'text.primary',
          display: 'flex',
          alignItems: 'center',
          marginBottom: 1
        }}>
          <MessageItem
            key={message.messageId}
            message={message}
            removeMessage={removeMessage}
          />

        </Paper>

      ))}
    </Fragment>
  );
}
