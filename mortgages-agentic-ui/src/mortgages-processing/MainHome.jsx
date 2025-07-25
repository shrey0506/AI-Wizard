import React, { useState, forwardRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Link, Menu, MenuItem, Grid  } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Dialog, DialogTitle, DialogContent, IconButton, Slide } from "@mui/material";
import AskUsModelBoxed from "./AskUsModelBoxed";

// Replace with your actual icon images or SVGs
const CARD_ICONS = [
  'calculators.png', // Calculator
  'aip.png', // Replace for Agreement in Principle
  'personalized.png', // Replace for Dashboard
];

const BG_IMAGE = 'brands-hero.jpg';

const offers = [
  {
    icon: CARD_ICONS[0],
    bg: '#00B06B',
    route: 'calculators',
    title: 'Mortgage calculators and tools',
    text: 'Find out how much you could borrow, view our mortgage rates, compare monthly repayment amounts and more.',
    button: 'Use our mortgage calculators',
    buttonVariant: 'contained',
    buttonColor: 'primary',
    buttonSx: {
      bgcolor: '#111',
      color: '#fff',
      borderRadius: 2,
      px: 3,
      py: 1.2,
      fontWeight: 700,
      fontSize: 18,
      boxShadow: 'none',
      mt: 2,
      '&:hover': {
        bgcolor: '#00844A',
        color: '#fff',
      },
    }
  },
  {
    icon: CARD_ICONS[1],
    bg: '#fff',
    route: 'agreementip',
    title: 'Agreement in Principle',
    text: 'An Agreement in Principle confirms how much you could be eligible to borrow, before you apply for a mortgage.',
    button: 'Get an Agreement in Principle',
    buttonVariant: 'outlined',
    buttonColor: 'inherit',
    buttonSx: {
      borderRadius: 2,
      borderColor: '#111',
      color: '#111',
      px: 3,
      py: 1.2,
      fontWeight: 700,
      fontSize: 18,
      boxShadow: 'none',
      mt: 2,
      borderWidth: 2,
      '&:hover': {
        bgcolor: '#00844A',
        color: '#fff',
        borderColor: '#00844A',
      },
    }
  },
  {
    icon: CARD_ICONS[2],
    bg: '#fff',
    route: 'mortgagedb',
    title: 'Your personalised mortgage dashboard',
    text: (
      <>
        Track the progress of your home purchase from start to finish with your very own personalised mortgage dashboard.<br /><br />
        <Typography component="span" sx={{ fontWeight: 400, fontSize: 16 }}>
          Already registered? <a href="#" style={{ color: "#111" }}>Sign back in</a>
        </Typography>
      </>
    ),
    button: 'Create your mortgage dashboard',
    buttonVariant: 'outlined',
    buttonColor: 'inherit',
    buttonSx: {
      borderRadius: 2,
      borderColor: '#111',
      color: '#111',
      px: 3,
      py: 1.2,
      fontWeight: 700,
      fontSize: 18,
      boxShadow: 'none',
      mt: 2,
      borderWidth: 2,
      '&:hover': {
        bgcolor: '#00844A',
        color: '#fff',
        borderColor: '#00844A',
      },
    }
  }
];

const navLinks = [
  { label: 'Mortgages', url: '#' },
  { label: 'Calculators & tools', url: '#' },
  { label: 'First-time buyers', url: '#' },
  { label: 'Remortgaging', url: '#' },
  { label: 'Existing customers', url: '#' },
  { label: 'Moving home', url: '#' },
  { label: 'Offers', url: '#' },
  { label: 'Mortgage rates', url: '#' },
];

const MainHome = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const handleMoreClick = (event) => setAnchorEl(event.currentTarget);
  const handleMoreClose = () => setAnchorEl(null);

    return (
  <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#f5f5f5', position: 'relative', pb: 8 }}>
    {/* HERO IMAGE + offer card as before */}
    <Box
        sx={{
          width: '100%',
          bgcolor: '#fff',
          px: { xs: 1, md: 6 },
          py: 2,
          borderBottom: '1px solid #eee',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {navLinks.map(link => (
          <Link
            key={link.label}
            href={link.url}
            underline="hover"
            sx={{
              color: '#222',
              fontWeight: link.label === 'Mortgages' ? 700 : 500,
              fontSize: 19,
              px: 1,
              textDecoration: link.label === 'Mortgages' ? 'none' : undefined,
              cursor: 'pointer'
            }}
          >
            {link.label}
          </Link>
        ))}
        {/* More dropdown */}
        <Button
          endIcon={<ArrowDropDownIcon />}
          onClick={handleMoreClick}
          sx={{
            color: '#222',
            fontWeight: 500,
            fontSize: 19,
            textTransform: 'none',
            px: 1,
            minWidth: 'unset',
          }}
        >
          More
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMoreClose}
        >
          <MenuItem onClick={handleMoreClose}>Option 1</MenuItem>
          <MenuItem onClick={handleMoreClose}>Option 2</MenuItem>
        </Menu>
      </Box>

    <Box
      sx={{
        width: '95vw',
        height: '75vh',
        mx: 'auto',
        mt: 2,
        backgroundImage: `url(${BG_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'flex-start',
        pl: { xs: 2, md: 8 },
        pt: { xs: 2, md: 6 },
        position: 'relative',
      }}
    >
      <Box
        sx={{
          bgcolor: '#00844A',
          color: '#fff',
          borderRadius: 4,
          p: { xs: 3, md: 6 },
          width: { xs: '90%', sm: 400, md: 480 },
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 2,
          mt: 2,
          mb: 2,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontFamily: '"Merriweather", serif',
            mb: 1,
            fontSize: { xs: 36, md: 56 },
          }}
        >
          Mortgages
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{
            fontWeight: 400,
            fontSize: 22,
            mb: 2,
            lineHeight: 1.3,
          }}
        >
          Do you have a Club Lloyds current account? You could get an exclusive discount on your initial rate when you complete on a qualifying mortgage with us.
        </Typography>
        <Button
          variant="outlined"
          sx={{
            borderRadius: 2,
            borderColor: '#fff',
            color: '#fff',
            fontWeight: 700,
            px: 3,
            py: 1.5,
            fontSize: 20,
            alignSelf: 'flex-start',
            borderWidth: 2,
            mt: 1,
            '&:hover': {
              bgcolor: '#fff',
              color: '#00844A',
              borderColor: '#fff',
            },
          }}
        >
          Our Club Lloyds offers
        </Button>
      </Box>
    </Box>

    {/* Section: Get started with our tools */}
    <Box sx={{ width: '100%', textAlign: 'center', mt: 7, mb: 3 }}>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, fontFamily: '"Merriweather", serif', fontSize: 40 }}>
        Get started with our tools
      </Typography>
      <Typography variant="h6" sx={{ mb: 3, color: '#222', fontWeight: 400, fontSize: 20 }}>
        Looking for <a href="#" style={{ color: '#00844A', textDecoration: 'underline' }}>mortgage rates</a>? Use our mortgage calculator to compare rates and find deals that may be available for you.
      </Typography>
    </Box>

    {/* Offer cards row */}
    <Grid container spacing={4} justifyContent="center" sx={{ width: '100%', m: 0 }}>
      {offers.map((offer, i) => (
        <Grid key={offer.title} item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              bgcolor: offer.bg,
              borderRadius: 4,
              p: 4,
              width: 380,
              boxShadow: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              minHeight: 390,
              color: offer.bg === '#fff' ? '#111' : '#fff',
            }}
          >
            <img
                src={offer.icon}
                alt=""
                style={{
                    width: 60,
                    height: 60,
                    marginBottom: 24, // <--- This controls the space!
                    filter: offer.bg === '#fff' ? 'none' : 'drop-shadow(0 2px 6px rgba(0,0,0,0.07))'
                }}
            />
            <Typography variant="h4" sx={{
              fontWeight: 550,
              mb: 2,
              fontFamily: '"Merriweather", serif',
              fontSize: 28,
              color: offer.bg === '#fff' ? '#111' : '#fff',
            }}>
              {offer.title}
            </Typography>
            <Typography variant="body1" sx={{
              fontWeight: 400,
              fontSize: 18,
              mb: 2,
              color: offer.bg === '#fff' ? '#111' : '#fff',
            }}>
              {offer.text}
            </Typography>
            <Button
                variant={offer.buttonVariant}
                onClick={() => offer.route && navigate(offer.route)}
                color={offer.buttonColor}
                // sx={{ ...offer.buttonSx, fontSize: 16 }} // override here, e.g., 16px
                 sx={{ ...offer.buttonSx, fontSize: 16, mt: 'auto' }} // mt: 'auto' pushes button to bottom
                fullWidth
                >
                {offer.button}
            </Button>
          </Box>
        </Grid>
      ))}
    </Grid>

    {/* Ask us / Chat to us vertical buttons */}
    <Box
      sx={{
        position: 'fixed',
        right: 0,
        top: '65%',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        transform: 'translateY(-50%)'
      }}
    >
      <AskUsModelBoxed />
    </Box>
  </Box>
)};

export default MainHome;
