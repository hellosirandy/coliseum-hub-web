import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddForm from './AddForm';

class AddStadiumModal extends React.Component {
  render() {
    const { open, onClose, classes } = this.props;
    return (
      <Modal
        open={Boolean(open)}
        onClose={onClose}
      >
        <div className={classes.paper}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="title" color="inherit">Add Stadium</Typography>
            </Toolbar>
          </AppBar>
          <Typography component="div" style={{ padding: 8 * 3 }}>
            {/* <LoginForm handleClose={onClose} /> */}
            <AddForm handleClose={onClose} />
          </Typography>
          <AddStadiumModalWrapped />
        </div>
      </Modal>
    );
  }
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 60,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

const AddStadiumModalWrapped = withStyles(styles, { withTheme: true })(AddStadiumModal);

export default AddStadiumModalWrapped;

