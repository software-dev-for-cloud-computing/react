import React from 'react';
import Chat from './Chat';
import PdfUploader from './PdfUploader';
import { Box, CssBaseline } from '@mui/material';

function Dashboard() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <CssBaseline />
      <Box sx={{ width: '30%', flexShrink: 0, overflow: 'auto' }}>  
        <PdfUploader onFileUpload={() => {}} />
      </Box>
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <Chat />
      </Box>
    </Box>
  );
}

export default Dashboard;
