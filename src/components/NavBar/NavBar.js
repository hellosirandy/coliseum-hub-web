import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DropDown from './DropDown';
import AuthModal from '../AuthModal/AuthModal';

class NavBar extends React.Component {
  state = {
    anchorEl: null,
    authModalOpen: false,
  }

  handleAccountClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }
  handleDropdownClose = () => {
    this.setState({ anchorEl: null });
  }
  handleLoginClick = () => {
    this.setState({ authModalOpen: true });
  };
  handleAuthModalClose = () => {
    this.setState({ authModalOpen: false });
  };
  render() {
    const { classes } = this.props;
    const { anchorEl, authModalOpen } = this.state;
    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography classes={{ title: classes.title }} variant="title" align="left" color="inherit" style={{ flex: 1 }}>
              Coliseumm Hub
            </Typography>
            <IconButton onClick={this.handleAccountClick}>
              <AccountCircle />
            </IconButton>
            <DropDown
              anchorEl={anchorEl}
              onClose={this.handleDropdownClose}
              onLoginClick={this.handleLoginClick}
            />
            <AuthModal open={authModalOpen} onClose={this.handleAuthModalClose} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const styles = {
  title: {
    fontFamily: '"Courgette", cursive',
  },
};

export default withStyles(styles)(NavBar);
