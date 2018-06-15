import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { authLogout } from '../../store/actions/index';

const dropDown = ({
  anchorEl, onClose, onLoginClick, isAuthenticated, onAuthLogout,
}) => {
  const content = isAuthenticated ? (
    <MenuItem onClick={() => {
      onClose();
      onAuthLogout();
    }}
    >Logout
    </MenuItem>
  ) : (
    <MenuItem onClick={() => {
        onClose();
        onLoginClick();
      }}
    >Login
    </MenuItem>
  );
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
      {content}
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

const mapStateToProps = (state) => {
  return {
    isAuthenticated: Boolean(state.auth.token),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthLogout: () => dispatch(authLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(dropDown);
