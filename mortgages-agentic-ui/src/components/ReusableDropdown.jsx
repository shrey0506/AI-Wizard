import React, { useState } from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';

export const ReusableDropdown = ({
  anchorEl,
  open,
  onClose,
  menuItems = [],
}) => (
  <Menu
    anchorEl={anchorEl}
    open={open}
    onClose={onClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    keepMounted
  >
    {menuItems.map((item, idx) =>
      item.children ? (
        <NestedDropdownMenuItem
          key={idx}
          item={item}
          onClose={onClose}
        />
      ) : (
        <MenuItem
          key={idx}
          onClick={() => {
            if (item.onClick) item.onClick();
            onClose();
          }}
        >
          {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
          <ListItemText>{item.label}</ListItemText>
        </MenuItem>
      )
    )}
  </Menu>
);

// Nested Dropdown for children menus
const NestedDropdownMenuItem = ({ item, onClose }) => {
  const [subAnchorEl, setSubAnchorEl] = useState(null);
  const open = Boolean(subAnchorEl);

  return (
    <React.Fragment>
      <MenuItem
        onMouseEnter={e => setSubAnchorEl(e.currentTarget)}
        onMouseLeave={() => setSubAnchorEl(null)}
        onClick={e => e.stopPropagation()} // prevents parent menu from closing
        aria-haspopup="true"
      >
        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
        <ListItemText>{item.label}</ListItemText>
      </MenuItem>
      <Menu
        anchorEl={subAnchorEl}
        open={open}
        onClose={() => setSubAnchorEl(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        keepMounted
        MenuListProps={{
          onMouseEnter: () => setSubAnchorEl(subAnchorEl),
          onMouseLeave: () => setSubAnchorEl(null),
        }}
      >
        {item.children.map((child, idx) => (
          <MenuItem
            key={idx}
            onClick={() => {
              if (child.onClick) child.onClick();
              onClose();
            }}
          >
            {child.icon && <ListItemIcon>{child.icon}</ListItemIcon>}
            <ListItemText>{child.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};
