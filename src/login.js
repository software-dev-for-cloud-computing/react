import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Container, Box } from '@mui/material';

function Login({ onLogin, onToggle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(true);
        sessionStorage.setItem('userId', data.userId); 
        localStorage.setItem('token', data.token); 
      } else {
        alert(data.message || 'Falsche Anmeldedaten!');
        onLogin(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
      onLogin(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} style={{ marginTop: '20vh', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Anmelden
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-Mail Adresse"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Passwort"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Anmelden
          </Button>
          <Button
            onClick={onToggle}
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
          >
            Zur Registrierung wechseln
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
