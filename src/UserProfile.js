
import React, { useState } from 'react';
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography, Paper, Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

function UserProfile() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') || '');

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSave = () => {
    console.log("API Key gespeichert:", apiKey);
    localStorage.setItem('apiKey', apiKey);
    handleClose();
  };

  return (
    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <Paper style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px', boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)' }}>
        <Typography variant="h6" style={{ flexGrow: 1 }}>Einstellungen</Typography>
        <IconButton color="primary" onClick={handleOpen} size="large">
          <SettingsIcon />
        </IconButton>
      </Paper>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>API-Schlüssel eingeben</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="apiKey"
            label="API-Schlüssel"
            type="text"
            fullWidth
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <Button onClick={handleSave} color="primary">Speichern</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserProfile;
