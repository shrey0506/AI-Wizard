import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { userProfileAtom } from '../stores/atom';
import { TextField, Typography, Box, Grid } from '@mui/material';
import { useToast } from "./ToastContext";

const editableFields = [
  'email', 'title', 'firstName', 'lastName', 'mobile',
   'propertyValue','deposit', 'totalLoan',
   'depositStatus',
  'maritalStatus', 'nationality',
];

const ProfilePage = () => {

   const {showToast} = useToast();

  const navigate = useNavigate();
  const [profile] = useAtom(userProfileAtom);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (profile) {
      setForm(profile);
    }
  }, [profile]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const updateDocument = () => {
    showToast("Details are updated succesfully", "Success")
    setTimeout(() => {
      navigate('/document-uploader'); // Replace with your actual path
    }, 3000);
  }

  if (!profile) {
    return <Typography>Loading profile...</Typography>;
  }

  return (
    <Box sx={{ width: '100%', pl: 6, pr: 6, mt: 4 }}>
      
      <Typography variant="h5" fontWeight={700} gutterBottom>
        My Profile
      </Typography>

      {/* Read-only Application ID */}
      {profile.userId && (
        <Box sx={{ mb: 3, textAlign:'left', ml:10 }}>
          <Typography fontWeight={700} align='left' sx={{ mb: 1 }}>
            Application ID
          </Typography>
          <TextField
            value={profile.userId}
            disabled
            sx={{
              width: '55%',
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                border: '2px solid #ccc',
                minHeight: 50,
                height: 50,
              },
              '& input': {
                textAlign: 'left', // 👈 Ensures left-aligned text
                paddingLeft: '16px', // optional: adds padding to left
              },
            }}
            inputProps={{ readOnly: true }}
          />

        </Box>
      )}

    {editableFields.map((field) => (
      <Box sx={{ mb: 3, textAlign:'left', ml:10 }}>
          <Typography fontWeight={700} align='left' sx={{ mb: 1 }}>
          {field.charAt(0).toUpperCase() + field.slice(1)}
        </Typography>
        <TextField
  value={form[field] ?? ''}
  onChange={handleChange(field)}  
  error={!!errors[field]}
  helperText={errors[field]}
  sx={{
    width: '55%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      border: '2px solid #111',
      paddingX: 2, // left/right padding inside field
      minHeight: 56, // taller than 50
      fontSize: 16,
    },
    input: {
      padding: '14px 16px', // top/bottom + left/right padding
      fontSize: 16,
    },
  }}
  inputProps={{ maxLength: 100 }}
  placeholder={`Enter ${field}`}
/>

        </Box>
    ))}


<Box sx={{ textAlign: 'left', ml: 10, mt: 4 }}>
  <button
    onClick={() => updateDocument()}
    style={{
      padding: '12px 24px',
      backgroundColor: '#1976d2',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
    }}
  >
    Submit & Continue
  </button>
</Box>

    </Box>
  );
};

export default ProfilePage;