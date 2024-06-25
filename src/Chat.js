// src/Chat.js
import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        const newMessages = [...messages, { text: input, sender: 'user' }];
        setMessages(newMessages);
        setInput('');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <List>
                    {messages.map((msg, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={msg.text} />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box component="form" onSubmit={sendMessage} sx={{ display: 'flex', padding: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Schreibe eine Nachricht..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    sx={{ marginRight: 1 }}
                />
                <Button variant="contained" color="primary" type="submit" endIcon={<SendIcon />}>
                    Senden
                </Button>
            </Box>
        </Box>
    );
}

export default Chat;
