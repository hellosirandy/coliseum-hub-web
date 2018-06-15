import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LoginForm from './LoginForm';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

class AuthModal extends React.Component {
  componentDidUpdate() {
    const { isAuthenticated, onClose } = this.props;
    if (isAuthenticated) {
      onClose();
    }
  }
  render() {
    const { classes, open, onClose } = this.props;
    return (
      <Modal
        open={Boolean(open)}
        onClose={onClose}
      >
        <div className={classes.paper}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="title" color="inherit">Login</Typography>
            </Toolbar>
          </AppBar>
          <Typography component="div" style={{ padding: 8 * 3 }}>
            <LoginForm handleClose={onClose} />
          </Typography>
          <AuthModalWrapped />
        </div>
      </Modal>
    );
  }
}

const AuthModalWrapped = withStyles(styles, { withTheme: true })(AuthModal);

const mapStateToProps = (state) => {
  return {
    isAuthenticated: Boolean(state.auth.token),
  };
};

export default connect(mapStateToProps)(AuthModalWrapped);
