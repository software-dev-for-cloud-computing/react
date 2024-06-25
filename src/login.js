
import React from 'react';
import { useMsal } from '@azure/msal-react';
import { Button, TextField, Typography, Paper, Container, Box } from '@mui/material';

function Login() {
  const { instance } = useMsal();

  const handleLogin = (event) => {
    event.preventDefault();
    instance.loginRedirect();
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Anmelden
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
