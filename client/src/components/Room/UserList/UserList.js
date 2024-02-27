import { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  listItem: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      cursor: 'pointer',
    },
    '&:active': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  activeListItem: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

export default function UserList({ users }) {
  const classes = useStyles();
  const [activeUserId, setActiveUserId] = useState(null);

  const handleListItemClick = (userId) => {
    setActiveUserId(userId === activeUserId ? null : userId);
  };

  return (
    <div className='container user'>
      <Typography variant="h5" gutterBottom component="div">
        Users
      </Typography>
      <List>
        {users.map(({ userId, userName }) => (
          <ListItem
            key={userId}
            className={`${classes.listItem} ${userId === activeUserId ? classes.activeListItem : ''}`}
            onClick={() => handleListItemClick(userId)}
          >
            <ListItemAvatar>
              <Avatar>
                <AiOutlineUser />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={userName} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}
