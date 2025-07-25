// import React, { useState } from 'react';
// import { Box, Typography, IconButton } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { ReusableDropdown } from '../components/ReusableDropdown';
// import  ReusableButton from '../components/ReusableButton';
// import { useNavigate } from 'react-router-dom'; // <-- Import here

// const HEADER_HEIGHT = 80; // px

// export const Header = () => {
//   const [menuAnchor, setMenuAnchor] = useState(null);
//   const navigate = useNavigate(); // <-- useNavigate hook

//   const handleProfileClick = (event) => {
//     setMenuAnchor(event.currentTarget);
//   };
//   const handleMenuClose = () => setMenuAnchor(null);

//   // Use navigate to go to the correct page on menu click
//   const menuItems = [
//     { label: 'Login', onClick: () => { handleMenuClose(); navigate('/login'); } },
//     { label: 'SignUp', onClick: () => { handleMenuClose(); navigate('/signup'); } },
//     {
//       label: 'Settings',
//       children: [
//         { label: 'Profile', onClick: () => { handleMenuClose(); navigate('/profile'); } },
//         { label: 'Preferences', onClick: () => { handleMenuClose(); navigate('/preferences'); } },
//       ]
//     }
//   ];

//   return (
//     <Box
//       sx={{
//         flex: '0 0 5%',
//         minHeight: 60,
//         maxHeight: '15vh',
//         bgcolor: '#00B06B',
//         color: '#fff',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontSize: 28,
//         position: 'relative', // Needed for absolute positioning of logo and profile icon
//       }}
//     >
//       {/* Logo on left, offset from left edge */}
//       <Box
//         sx={{
//           position: 'absolute',
//           left: '2%',
//           display: 'flex',
//           alignItems: 'center',
//         }}
//       >
//         <img
//           src="/lloyds-logo.png"
//           alt="Logo"
//           style={{
//             height: 48,
//             width: 'auto',
//             objectFit: 'contain',
//             marginLeft: '10vw',
//           }}
//         />
//       </Box>

//       {/* Centered text */}
//       <Box
//         sx={{
//           width: '100%',
//           display: 'flex',
//           justifyContent: 'center',
//           pointerEvents: 'none', // prevent accidental click events
//         }}
//       >
//         <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 1 }}>
//           Mortgage Agentic - Portal
//         </Typography>
//       </Box>

//        {/* Home Button (add after the title box, but before profile icon box) */}
//     <Box
//   sx={{
//     position: 'absolute',
//     left: '65%',
//     display: 'flex',
//     alignItems: 'center',
//     pointerEvents: 'auto', // so the button is clickable
//   }}
// >
//   <ReusableButton
//     onClick={() => navigate('/')}
//     sx={{
//       bgcolor: 'white',
//       color: 'black',
//       fontWeight: 700,
//       textTransform: 'none',
//       borderRadius: 2,
//       boxShadow: 'none',
//       px: 3,
//       py: 1,
//       '&:hover': {
//         bgcolor: '#00844A',
//         color: '#fff',
//       },
//     }}
//   >
//     Home
//   </ReusableButton>
// </Box>

//       {/* Profile/Login Icon at right */}
//       <Box sx={{ position: 'absolute', right: '2%', display: 'flex', alignItems: 'center' }}>
//         <IconButton sx={{ color: '#fff' }} aria-label="profile" onClick={handleProfileClick}>
//           <AccountCircleIcon sx={{ fontSize: 40 }} />
//         </IconButton>
//         <ReusableDropdown
//           anchorEl={menuAnchor}
//           open={Boolean(menuAnchor)}
//           onClose={handleMenuClose}
//           menuItems={menuItems}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default Header;


import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ReusableDropdown } from '../components/ReusableDropdown';
import ReusableButton from '../components/ReusableButton';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { userStateAtom, userProfileAtom } from '../stores/atom';
import useAuth from '../hooks/useAuth'; // <-- useAuth hook you defined earlier

const Header = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, firstName } = useAuth();

  const resetUser = useSetAtom(userStateAtom);
  const resetProfile = useSetAtom(userProfileAtom);

  const handleLogout = () => {
    resetUser({ userId: null, authToken: null });
    resetProfile(null);
    handleMenuClose();
    navigate('/login'); // redirect to login after logout
  };

  const handleProfileClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => setMenuAnchor(null);

  const menuItems = isAuthenticated
    ? [{ label: 'Logout', onClick: handleLogout }]
    : [
        { label: 'Login', onClick: () => { handleMenuClose(); navigate('/login'); } },
        { label: 'SignUp', onClick: () => { handleMenuClose(); navigate('/signup'); } },
        {
          label: 'Settings',
          children: [
            { label: 'Profile', onClick: () => { handleMenuClose(); navigate('/profile'); } },
            { label: 'Preferences', onClick: () => { handleMenuClose(); navigate('/preferences'); } },
          ],
        },
      ];

  return (
    <Box
      sx={{
        flex: '0 0 5%',
        minHeight: 60,
        maxHeight: '15vh',
        bgcolor: '#00B06B',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 28,
        position: 'relative',
      }}
    >
      {/* Logo */}
      <Box sx={{ position: 'absolute', left: '2%', display: 'flex', alignItems: 'center' }}>
        <img
          src="/lloyds-logo.png"
          alt="Logo"
          style={{
            height: 48,
            width: 'auto',
            objectFit: 'contain',
            marginLeft: '10vw',
          }}
        />
      </Box>

      {/* Title */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 1 }}>
          Mortgage Agentic - Portal
        </Typography>
      </Box>

      {/* Home + User Name (after Home if logged in) */}
      <Box
        sx={{
          position: 'absolute',
          left: '65%',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          pointerEvents: 'auto',
        }}
      >
        <ReusableButton
          onClick={() => navigate('/')}
          sx={{
            bgcolor: 'white',
            color: 'black',
            fontWeight: 700,
            textTransform: 'none',
            borderRadius: 2,
            boxShadow: 'none',
            px: 3,
            py: 1,
            '&:hover': {
              bgcolor: '#00844A',
              color: '#fff',
            },
          }}
        >
          Home
        </ReusableButton>

        {/* {isAuthenticated && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {firstName}
          </Typography>
          <ReusableButton
            onClick={handleLogout}
            sx={{
              bgcolor: 'white',
              color: 'black',
              fontWeight: 700,
              textTransform: 'none',
              borderRadius: 2,
              boxShadow: 'none',
              px: 2,
              py: 0.8,
              '&:hover': {
                bgcolor: '#00844A',
                color: '#fff',
              },
            }}
          >
            Logout
          </ReusableButton>
        </Box>
        )} */}

      </Box> 

      {/* Profile icon or dropdown on right */}
      {/* <Box sx={{ position: 'absolute', right: '2%', display: 'flex', alignItems: 'center' }}>
        {!isAuthenticated && (
          <IconButton sx={{ color: '#fff' }} aria-label="profile" onClick={handleProfileClick}>
            <AccountCircleIcon sx={{ fontSize: 40 }} />
          </IconButton>
        )}
        <ReusableDropdown
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          menuItems={menuItems}
        />
      </Box> */}
      {/* Right corner: Profile Icon (if logged out) OR User Name + Logout (if logged in) */}
<Box sx={{ position: 'absolute', right: '2%', display: 'flex', alignItems: 'center', gap: 2 }}>
  {!isAuthenticated ? (
    <>
      <IconButton sx={{ color: '#fff' }} aria-label="profile" onClick={handleProfileClick}>
        <AccountCircleIcon sx={{ fontSize: 40 }} />
      </IconButton>
      <ReusableDropdown
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        menuItems={menuItems}
      />
    </>
  ) : (
    <>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#fff' }}>
        {firstName}
      </Typography>
      <ReusableButton
        onClick={handleLogout}
        sx={{
          bgcolor: 'white',
          color: 'black',
          fontWeight: 700,
          textTransform: 'none',
          borderRadius: 2,
          boxShadow: 'none',
          px: 2,
          py: 0.8,
          '&:hover': {
            bgcolor: '#00844A',
            color: '#fff',
          },
        }}
      >
        Logout
      </ReusableButton>
    </>
  )}
</Box>
    </Box>
  );
};

export default Header;
