import {Fragment, useEffect} from 'react';
import MessageItem from './MessageItem';
import {Paper} from '@mui/material';
import {makeStyles} from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    height: '600px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column-reverse',
    flexGrow: 1, overflowY: 'auto', gap: 1, marginBottom: 1
  },
}));
export default function MessageList({log, messages, removeMessage}) {
  const classes = useStyles();
  // console.log(log)
  return (
    <Fragment>
      <div>онлайн/офлайн {log}</div>
      <div className={classes.container}>

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
              key={message.id}
              message={message}
              removeMessage={removeMessage}
            />

          </Paper>

        ))}
      </div>
    </Fragment>
  );
}
