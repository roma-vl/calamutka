import {useEffect, useState} from 'react';
import ChatWindow from './ChatWindow';
import {Avatar} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import './ChatComponent.css';
import {useSelector} from "react-redux";

const ChatComponent = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [chats, setChats] = useState([
    {id: 1, user: 'КМ'},
  ]);

  const [cancelIconsVisible, setCancelIconsVisible] = useState([false, false]);

  const handleChatToggle = () => {
    setChatOpen(!isChatOpen);
  };

  const handleMouseEnter = (index) => {
    setCancelIconsVisible((prev) => {
      const updatedArray = [...prev];
      updatedArray[index] = true;
      return updatedArray;
    });
  };

  const handleMouseLeave = (index) => {
    setCancelIconsVisible((prev) => {
      const updatedArray = [...prev];
      updatedArray[index] = false;
      return updatedArray;
    });
  };

  const handleRemoveChat = (event, index) => {
    event.stopPropagation();
    setChats((prevChats) => {
      return prevChats.filter((_, i) => i !== index);
    });
  };

  const user = useSelector(state => state.user.userData);

  return (
    <div className="chat-container">
      {user && (
        chats.map((chat, index) => (
          <div
            key={chat.id}
            className={`chat-button ${isChatOpen ? 'chat-button-open' : ''}`}
            onClick={handleChatToggle}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            style={{marginBottom: '3px', position: 'relative'}}
          >
            <Avatar>{chat.user}</Avatar>
            {cancelIconsVisible[index] && (
              <CancelIcon
                className="cancel-icon"
                style={{position: 'absolute', top: -2, right: -2}}
                onClick={(event) => {
                  event.stopPropagation();
                  handleRemoveChat(event, index);
                }}
              />
            )}
          </div>
        ))
      )}
      {isChatOpen && <ChatWindow onClose={() => setChatOpen(false)}/>}
    </div>
  );
};

export default ChatComponent;
