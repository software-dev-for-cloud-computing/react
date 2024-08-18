import React, { useState, useEffect } from 'react';
import {
  Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography,
  Paper, Container, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

function PdfUploader({ onFileUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(-1); // -1 bedeutet kein Editieren, ansonsten ist es der Index des zu bearbeitenden Elements
  const [metadata, setMetadata] = useState({
    author: '',
    title: '',
    year: '',
    url: '',
    isbn: '',
    type: '',
    tag: ''
  });
  const [tags, setTags] = useState([]);
  const [userId, setUserId] = useState('');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    fetchTags();
    const storedUserId = sessionStorage.getItem('userId');
    const storedApiKey = localStorage.getItem('apiKey');
    console.log('Stored User ID:', storedUserId);
    console.log('Stored API Key:', storedApiKey);
    if (storedUserId) setUserId(storedUserId);
    if (storedApiKey) setApiKey(storedApiKey);
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tags`);
      setTags(response.data);
    } catch (error) {
      console.error('Fehler beim Abrufen der Tags:', error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setDialogOpen(true);
  };

  const handleUpload = () => {
    console.log('Selected File:', selectedFile);
    console.log('User ID:', userId);
    console.log('API Key:', apiKey);

    if (!selectedFile || !userId || !apiKey) {
      console.error('Fehlende Datei, Benutzer-ID oder API-Schlüssel');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', selectedFile);
    formData.append('userId', userId);
    formData.append('conversationId', '66c087cde8c0184556971724'); // Beispielhafte Conversation ID
    formData.append('author', metadata.author);
    formData.append('title', metadata.title);
    formData.append('year', metadata.year);
    formData.append('url', metadata.url);
    formData.append('isbn', metadata.isbn);
    formData.append('type', metadata.type);
    formData.append('tag', metadata.tag);
    formData.append('apiKey', apiKey);

    axios.post(`${process.env.REACT_APP_API_URL}/api/documents/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log('Upload erfolgreich', response.data);
      const newEntry = { file: selectedFile, metadata };
      if (editIndex >= 0) {
        uploadedFiles[editIndex] = newEntry;
        setUploadedFiles([...uploadedFiles]);
      } else {
        setUploadedFiles([...uploadedFiles, newEntry]);
      }
      closeDialog();
    })
    .catch(error => {
      console.error('Upload fehlgeschlagen', error);
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setSelectedFile(uploadedFiles[index].file);
    setMetadata(uploadedFiles[index].metadata);
    setDialogOpen(true);
  };

  const handleDelete = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const closeDialog = () => {
    setSelectedFile(null);
    setMetadata({ author: '', title: '', year: '', url: '', isbn: '', type: '', tag: '' });
    setEditIndex(-1);
    setDialogOpen(false);
  };

  const handleMetadataChange = (e) => {
    const { name, value } = e.target;
    setMetadata({ ...metadata, [name]: value });
  };

  return (
    <Container component="main" maxWidth="sm" style={{ height: '100%', padding: '20px' }}>
      <Paper style={{ height: '100%', overflow: 'auto', padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          PDF hochladen
        </Typography>
        <input
          accept="application/pdf"
          style={{ display: 'none' }}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span" startIcon={<CloudUploadIcon />} style={{ marginBottom: 20 }}>
            Datei auswählen
          </Button>
        </label>
        <List dense={true}>
          {uploadedFiles.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.file.name} secondary={`Autor: ${item.metadata.author}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Dialog open={dialogOpen} onClose={closeDialog}>
          <DialogTitle>{editIndex >= 0 ? 'Metadaten bearbeiten' : 'Metadaten eingeben'}</DialogTitle>
          <DialogContent>
            {Object.keys(metadata).filter(key => key !== 'tag').map(key => (
              <TextField
                key={key}
                fullWidth
                margin="dense"
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                type="text"
                name={key}
                value={metadata[key]}
                onChange={handleMetadataChange}
              />
            ))}
            <FormControl fullWidth margin="dense">
              <InputLabel id="tag-select-label">Tag</InputLabel>
              <Select
                labelId="tag-select-label"
                name="tag"
                value={metadata.tag}
                onChange={handleMetadataChange}
                label="Tag"
              >
                {tags.map((tag) => (
                  <MenuItem key={tag._id} value={tag._id}>
                    {tag.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Abbrechen</Button>
            <Button onClick={handleUpload} color="primary">Speichern</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
}

export default PdfUploader;
