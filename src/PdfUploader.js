// src/PdfUploader.js
import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Paper, Container } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';

function PdfUploader({ onFileUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
      setUploadedFiles([...uploadedFiles, selectedFile]);
      setSelectedFile(null);
    } else {
      alert('Bitte wähle zuerst eine Datei aus.');
    }
  };

  const handleDelete = (fileToDelete) => {
    const newFiles = uploadedFiles.filter(file => file !== fileToDelete);
    setUploadedFiles(newFiles);
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
          <Button 
            variant="contained" 
            component="span" 
            startIcon={<CloudUploadIcon />} 
            style={{ marginRight: 10, marginBottom: 20 }}>
            Datei auswählen
          </Button>
        </label>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleUpload}
          style={{ marginBottom: 20 }}>
          Upload
        </Button>
        <List dense={true} style={{ marginTop: 20 }}>
          {uploadedFiles.map((file, index) => (
            <ListItem key={index}>
              <ListItemText primary={file.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(file)}>
                  <DeleteIcon style={{ color: red[500] }} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default PdfUploader;
