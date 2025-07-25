import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const OFFER_GREEN = '#00844A';

export const OfferCard = ({
  title,
  description,
  buttonText,
  onButtonClick,
  sx = {},
}) => (
  <Box
    sx={{
      bgcolor: OFFER_GREEN,
      color: '#fff',
      borderRadius: 3,
      p: 2,
      mb: 3,
      boxShadow: 3,
      maxWidth: 300,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 1, // reduced!
      ...sx,
    }}
  >
    <Typography
      variant="h5"
      sx={{
        fontWeight: 700,
        mb: 0.5,
        fontFamily: '"Merriweather", serif',
      }}
    >
      {title}
    </Typography>
    <Typography
      variant="body1"
      sx={{ fontWeight: 400, mb: 0.5, lineHeight: 1.3 }}
    >
      {description}
    </Typography>
    <Button
      onClick={onButtonClick}
      variant="outlined"
      sx={{
        borderRadius: 2,
        borderColor: '#fff',
        color: '#fff',
        fontWeight: 700,
        px: 3,
        py: 1,
        fontSize: 18,
        alignSelf: 'flex-start',
        // No mt, keeps button close to text
        '&:hover': {
          bgcolor: '#fff',
          color: OFFER_GREEN,
          borderColor: '#fff',
        },
      }}
    >
      {buttonText}
    </Button>
  </Box>
);

export default OfferCard;
