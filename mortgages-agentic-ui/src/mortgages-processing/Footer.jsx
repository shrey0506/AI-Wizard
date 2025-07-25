import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    sx={{
      flex: '0 0 5%',
      minHeight: 25,
      maxHeight: '10vh',
      bgcolor: '#00B06B',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      borderTop: '2px solid #e0e0e0',
    }}
  >
    <Typography>
      Copyright &copy; {new Date().getFullYear()} Mortgage Agentic
    </Typography>
  </Box>
);

export default Footer;
