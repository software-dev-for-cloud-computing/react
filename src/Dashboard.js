import React from 'react';
import Chat from './Chat';
import PdfUploader from './PdfUploader';
import UserProfile from './UserProfile';
import TagManager from './TagManager'; 
import { Box, CssBaseline } from '@mui/material';

function Dashboard() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <CssBaseline />
      <Box
        sx={{
          width: '30%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          padding: '10px',
        }}
      >
        <Box
          sx={{
            height: '60%',
            overflow: 'auto',
            marginBottom: '10px',
          }}
        >
          <PdfUploader onFileUpload={() => {}} />
        </Box>
        <Box
          sx={{
            height: '30%',
            overflow: 'hidden',
            marginBottom: '10px',
          }}
        >
          <TagManager />
        </Box>
        <Box
          sx={{
            height: '10%',
            overflow: 'hidden',
          }}
        >
          <UserProfile />
        </Box>
      </Box>
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <Chat />
      </Box>
    </Box>
  );
}

export default Dashboard;
