import React from 'react';
import { Button } from '@mui/material';

const ReusableButton = ({
  children,
  variant = 'contained',
  color = 'primary',
  fullWidth = false,
  onClick,
  type = 'button',
  sx = {},
  startIcon,
  endIcon,
  ...rest
}) => (
  <Button
    variant={variant}
    color={color}
    fullWidth={fullWidth}
    onClick={onClick}
    type={type}
    startIcon={startIcon}
    endIcon={endIcon}
    sx={sx}
    {...rest}
  >
    {children}
  </Button>
);

export default ReusableButton;
