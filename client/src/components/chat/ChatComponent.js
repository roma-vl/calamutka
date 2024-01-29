// ChatComponent.js
import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import { Button, Avatar } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import './ChatComponent.css';

const ChatComponent = () => {
    const [isChatOpen, setChatOpen] = useState(false);
    const [chats, setChats] = useState([
        { id: 1, user: 'КМ' },
        { id: 2, user: 'РВ' },
        { id: 2, user: 'РВ' }
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
        // Зупиняємо подальшу передачу подій кліку вище по ієрархії
        event.stopPropagation();

        setChats((prevChats) => {
            // Створюємо новий масив чатів, виключаючи чат, який потрібно видалити
            const updatedChats = prevChats.filter((_, i) => i !== index);
            return updatedChats;
        });
    };

    return (
        <div className="chat-container">
            {chats.map((chat, index) => (
                <div
                    key={chat.id}
                    className={`chat-button ${isChatOpen ? 'chat-button-open' : ''}`}
                    onClick={handleChatToggle}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    style={{ marginBottom: '3px', position: 'relative' }}
                >
                    <Avatar>
                        {/* Використовуйте дані користувача чату, наприклад, chat.user */}
                        {chat.user}
                    </Avatar>
                    {cancelIconsVisible[index] && (
                        <CancelIcon
                            className="cancel-icon"
                            style={{ position: 'absolute', top: -2, right: -2 }}
                            onClick={(event) => {
                                event.stopPropagation();
                                handleRemoveChat(event, index);
                            }}
                        />
                    )}
                </div>
            ))}
            {isChatOpen && <ChatWindow onClose={() => setChatOpen(false)} />}
        </div>
    );
};

export default ChatComponent;
