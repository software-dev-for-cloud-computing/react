import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Container, Box } from '@mui/material';

function Register({ onRegister, onToggle }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwörter stimmen nicht überein!');
      return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
          });
          

      const data = await response.json();

      if (response.ok) {
        onRegister(true);
      } else {
        console.error('Backend error:', data.message);
        alert(data.message || 'Registrierung fehlgeschlagen!');
        onRegister(false);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
      onRegister(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} style={{ marginTop: '20vh', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Registrieren
        </Typography>
        <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Benutzername"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-Mail Adresse"
            name="email"
            autoComplete="email"
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Passwort bestätigen"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrieren
          </Button>
          <Button
            onClick={onToggle}
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
          >
            Zum Login wechseln
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;
