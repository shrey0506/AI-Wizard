import React from 'react';
import { Button } from '@mui/material';

const FileUpload = ({
  label,
  name,
  id,
  register,
  accept,
  error,
  helperText,
  onChange,
  ...rest
}) => (
  <div style={{ margin: '8px 0' }}>
    <input
      type="file"
      id={id}
      name={name}
      accept={accept}
      style={{ display: 'none' }}
      onChange={onChange}
      {...rest}
    />
    <label htmlFor={id}>
      <Button variant="contained" component="span">
        {label}
      </Button>
    </label>
    {helperText && (
      <div style={{ color: error ? 'red' : 'inherit', fontSize: 12, marginTop: 4 }}>
        {helperText}
      </div>
    )}
  </div>
);

export default FileUpload;
