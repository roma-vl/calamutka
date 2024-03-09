import { useState, useEffect } from 'react';
import { AiOutlineUser, AiOutlineMessage } from 'react-icons/ai';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { get } from "../../../api/axios.api";
import {setRoomId} from "../../../redux/actions/chatActions";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    height: '400px',
    overflow: 'auto',
  },
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
  messageIcon: {
    marginLeft: 'auto',
    fontSize: 24,
    cursor: 'pointer',
  },
}));

export default function UserList({ user, getMessages, createRoom, getRooms, rooms ,roomId}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
      getRooms(user.user.id);
  }, [getRooms]);

  const handleListItemClick = (roomId) => {
    dispatch(setRoomId(roomId))
    getMessages({roomId: roomId});
  };
  const handleSendMessageClick = (userId, user, roomId) => {
    createRoom(user.user.id, userId)
    dispatch(setRoomId(roomId))
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSearchChange = async (event) => {
    const { value } = event.target;
    setSearchQuery(value);

    if (value.length >= 1) {
      try {
        const response = await get(`/users/search?username=${value}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className='container user'>
      <Typography variant="h5" gutterBottom component="div">
        Users
      </Typography>

      <TextField
        label="Search users"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <List>
        {searchResults.map(({ id, username, email, profile_picture }) => (
          <ListItem
            key={id}
            className={`${classes.listItem} ${id == roomId ? classes.activeListItem : ''}`}
          >
            <ListItemAvatar>
              <Avatar>
                {profile_picture ? <img src={`${profile_picture}`} alt="" /> : <AiOutlineUser />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={username} secondary={email} />
            <div className={classes.messageIcon} onClick={() => handleSendMessageClick(id, user, roomId)}>
              <AiOutlineMessage />
            </div>
          </ListItem>
        ))}
      </List>
      <List className={classes.container}>
        {rooms.map(({ id, roomName, userImage }) => (
          <ListItem
            key={id}
            className={`${classes.listItem} ${id == roomId ? classes.activeListItem : ''}`}
            onClick={() => handleListItemClick(id)}
          >
            <ListItemAvatar>
              <Avatar>
                {userImage ? <img src={`${userImage}`} alt="" /> : <AiOutlineUser />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={roomName} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
