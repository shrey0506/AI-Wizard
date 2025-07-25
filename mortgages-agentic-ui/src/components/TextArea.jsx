import React from 'react';
import { TextField } from '@mui/material';

const TextInput = ({
  label,
  name,
  id,
  register,
  error,
  helperText,
  size = "small",
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
    sx={{
      // Outlined style (default)
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'grey.400',
          transition: 'border-color 0.2s',
        },
        '&:hover fieldset': {
          borderColor: 'green', // Green border on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green', // Green border on focus
        },
      },
      // Label color on focus/hover
      '& label.Mui-focused': {
        color: 'green',
      },
      '& label': {
        transition: 'color 0.2s',
      },
      // Underline style for standard variant (if you ever use it)
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
    }}
    {...rest}
  />
);

export default TextInput;
