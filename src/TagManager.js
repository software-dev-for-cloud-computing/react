import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

function TagManager() {
  const [tags, setTags] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isNewTag, setIsNewTag] = useState(true);
  const [selectedTagId, setSelectedTagId] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tags`);
      setTags(response.data);
    } catch (error) {
      console.error('Fehler beim Abrufen der Tags:', error);
    }
  };

  const openDialogForNewTag = () => {
    setIsNewTag(true);
    setTagInput('');
    setDescriptionInput('');
    setDialogOpen(true);
  };

  const openDialogForExistingTag = () => {
    setIsNewTag(false);
    const tag = tags.find(t => t._id === selectedTagId);
    if (tag) {
      setTagInput(tag.name);
      setDescriptionInput(tag.description);
    }
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleTagSave = async () => {
    if (isNewTag) {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/tags`, { name: tagInput, description: descriptionInput });
      } catch (error) {
        console.error('Fehler beim Erstellen eines Tags:', error);
      }
    } else {
      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/tags/${selectedTagId}`, { name: tagInput, description: descriptionInput });
      } catch (error) {
        console.error('Fehler beim Aktualisieren des Tags:', error);
      }
    }
    fetchTags();
    handleDialogClose();
  };

  const handleTagDelete = async () => {
    if (selectedTagId) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/tags/${selectedTagId}`);
        fetchTags();
      } catch (error) {
        console.error('Fehler beim Löschen des Tags:', error);
      }
    }
    handleDialogClose();
  };

  return (
    <Paper style={{ padding: '20px' }}>
      <Button startIcon={<AddIcon />} onClick={openDialogForNewTag} sx={{ mb: 2 }}>
        Neuen Tag hinzufügen
      </Button>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="tag-select-label">Tag auswählen</InputLabel>
        <Select
          labelId="tag-select-label"
          value={selectedTagId}
          label="Tag auswählen"
          onChange={(e) => setSelectedTagId(e.target.value)}
        >
          {tags.map((tag) => (
            <MenuItem key={tag._id} value={tag._id}>
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="outlined" onClick={openDialogForExistingTag} disabled={!selectedTagId}>
        Ausgewählten Tag bearbeiten/löschen
      </Button>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{isNewTag ? 'Neuen Tag hinzufügen' : 'Tag bearbeiten/löschen'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tag-Name"
            type="text"
            fullWidth
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Beschreibung"
            type="text"
            fullWidth
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Abbrechen</Button>
          <Button onClick={handleTagSave}>Speichern</Button>
          {!isNewTag && (
            <Button onClick={handleTagDelete} color="error">Löschen</Button>
          )}
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default TagManager;
