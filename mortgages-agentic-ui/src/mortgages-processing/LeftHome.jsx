import React from 'react';
import { Box } from '@mui/material';
import OfferCard from '../components/OfferCard'; // Import your OfferCard component

const LeftHome = () => (
  <Box
    sx={{
      width: 400,              // or '30%' if using percent layout
      minWidth: 260,
      maxWidth: 420,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      gap: 4,
      px: 2,
      py: 2,
      backgroundSize: 'cover',
      backgroundPosition: 'left center',
      backgroundRepeat: 'no-repeat',
      borderRadius: 0, // or adjust as needed
      position: 'relative',
    }}
  >
    <OfferCard
      title="Mortgages"
      description="Do you have a Club Lloyds current account? You could get an exclusive discount on your initial rate when you complete on a qualifying mortgage with us."
      buttonText="Our Club Lloyds offers"
      onButtonClick={() => alert('Top Offer Clicked!')}
    />
    <OfferCard
      title="Mortgages"
      description="Do you have a Club Lloyds current account? You could get an exclusive discount on your initial rate when you complete on a qualifying mortgage with us."
      buttonText="Our Club Lloyds offers"
      onButtonClick={() => alert('Top Offer Clicked!')}
    />
    {/* You can add another <OfferCard /> below if needed */}
  </Box>
);

export default LeftHome;
