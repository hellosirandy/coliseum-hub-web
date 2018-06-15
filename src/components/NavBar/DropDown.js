import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const dropDown = ({ anchorEl, onClose, onLoginClick }) => {
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={() => {
        onClose();
        onLoginClick();
      }}
      >Login
      </MenuItem>
    </Menu>
  );
};

dropDown.defaultProps = {
  anchorEl: null,
};

dropDown.propTypes = {
  anchorEl: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
};

export default dropDown;
