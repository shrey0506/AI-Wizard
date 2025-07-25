import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle'; // Example icon, change as needed

const TextInput = ({
  label,
  name,
  id,
  register,
  error,
  helperText,
  size = "small",
  icon,            // Pass icon component as prop if needed
  ...rest
}) => (
  <TextField
    label={label}
    id={id}
    fullWidth
    margin="normal"
    size={size}
    {...register(name)}
    error={!!error}
    helperText={helperText}
    InputProps={{
      startAdornment: icon ? (
        <InputAdornment position="start">
          {icon}
        </InputAdornment>
      ) : null
    }}
    sx={{
      '& .MuiInputBase-root': {
        '& .MuiSvgIcon-root': {
          color: 'grey.500',
          transition: 'color 0.2s',
        },
        '&:hover .MuiSvgIcon-root, &.Mui-focused .MuiSvgIcon-root': {
          color: 'green',     // Icon color on hover/focus
        },
      },
      '& label.Mui-focused': {
        color: 'green',        // Label color on focus
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green', // Underline color after focus
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'grey.400',
        },
        '&:hover fieldset': {
          borderColor: 'green',   // Outline color on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green',   // Outline color on focus
        },
      },
    }}
    {...rest}
  />
);

export default TextInput;
