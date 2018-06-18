import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DropDown from './DropDown';
import AuthModal from '../AuthModal/AuthModal';
import AddStadiumModal from '../AddStadiumModal/AddStadiumModal';
import { resizeImage } from '../../store/actions/api';

class NavBar extends React.Component {
  state = {
    anchorEl: null,
    authModalOpen: false,
    addStaiumModalOpen: false,
  }

  handleAccountClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }
  handleAddClick = () => {
    this.setState({ addStaiumModalOpen: true });
    resizeImage().then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
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
  handleAddStadiumModalClose = () => {
    this.setState({ addStaiumModalOpen: false });
  };
  render() {
    const { classes, isAuthenticated } = this.props;
    const { anchorEl, authModalOpen, addStaiumModalOpen } = this.state;
    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography classes={{ title: classes.title }} variant="title" align="left" color="inherit" style={{ flex: 1 }}>
              Coliseumm Hub
            </Typography>
            {isAuthenticated && (
              <IconButton onClick={this.handleAddClick}>
                <AddCircleIcon />
              </IconButton>
            )}
            <IconButton onClick={this.handleAccountClick}>
              <AccountCircleIcon />
            </IconButton>
            <DropDown
              anchorEl={anchorEl}
              onClose={this.handleDropdownClose}
              onLoginClick={this.handleLoginClick}
            />
            <AuthModal open={authModalOpen} onClose={this.handleAuthModalClose} />
            <AddStadiumModal open={addStaiumModalOpen} onClose={this.handleAddStadiumModalClose} />
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

const mapStateToProps = (state) => {
  return {
    isAuthenticated: Boolean(state.auth.token),
  };
};

export default connect(mapStateToProps)(withStyles(styles)(NavBar));
