import React, { useState } from 'react';
import { Box, Paper, Input, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ChatWindow = ({ onClose }) => {
    const [messages, setMessages] = useState([
        { text: 'Привіт, як справи?', sender: 'user' },
        { text: 'Привіт, все гаразд!', sender: 'other' },
    ]);

    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        setMessages([...messages, { text: newMessage, sender: 'user' }]);
        setNewMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Paper elevation={3} sx={{ position: 'fixed', bottom: 10, right: 70, width: 300, height: 400, padding: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ backgroundColor: 'primary.main', color: 'white', paddingLeft: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p>Месенджер</p>
                <Button onClick={onClose} variant="contained" sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    minWidth: 'fit-content',
                    padding: '8px 12px',
                    // borderRadius: 1,
                    width: '15%',
                    marginRight: 1
                }}>Х</Button>
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column-reverse', overflowY: 'auto', gap: 1, marginBottom: 1 }}>
                {messages.slice().reverse().map((message, index) => (
                    <Paper key={index} elevation={1} sx={{ padding: 1, borderRadius: 1, maxWidth: '80%', alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start', backgroundColor: message.sender === 'user' ? 'primary.main' : 'background.paper', color: message.sender === 'user' ? 'white' : 'text.primary', display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                        {message.sender === 'other' && <AccountCircleIcon sx={{ marginRight: 1 }} />}
                        {message.text}
                        {message.sender === 'user' && <AccountCircleIcon sx={{ marginLeft: 1 }} />}
                    </Paper>
                ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
                <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Напишіть повідомлення"
                    sx={{
                        flexGrow: 1,
                        marginRight: 1,
                        padding: 1,
                        backgroundColor: 'white', // Змінено на білий фон
                        border: '1px solid primary.main',
                        borderRadius: 1,
                        color: 'black', // Змінено на чорний колір тексту
                        width: '85%',
                    }}
                />
                <Button
                    variant="contained"
                    onClick={handleSendMessage}
                    sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        minWidth: 'fit-content',
                        padding: '8px 12px',
                        borderRadius: 1,
                        width: '15%',
                    }}
                >
                    <SendIcon sx={{ marginLeft: 1 }} />
                </Button>
            </Box>
        </Paper>
    );
};

export default ChatWindow;
