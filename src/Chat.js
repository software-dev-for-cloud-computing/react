import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();

        const userId = sessionStorage.getItem('userId'); 
        const apiKey = localStorage.getItem('apiKey'); 
        const conversationId = '66c087cde8c0184556971724'; 
        const query = input;

        const newMessages = [...messages, { text: query, sender: 'user' }];
        setMessages(newMessages);
        setInput('');

        if (!userId || !apiKey) {
            console.error('Fehlende Benutzer-ID oder API-Schlüssel');
            return;
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/chat/response`, {
                params: {
                    userId: userId,
                    conversationId: conversationId,
                    query: query,
                    apiKey: apiKey 
                }
            });

            const botResponse = response.data.answer; 

            setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
        } catch (error) {
            console.error('Fehler beim Abrufen der Antwort:', error);
        }
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
