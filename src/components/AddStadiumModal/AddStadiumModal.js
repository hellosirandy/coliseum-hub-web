import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddForm from './AddForm';

class AddStadiumModal extends React.Component {
  handleCloseClick = () => {
    this.props.onClose();
  }
  render() {
    const { open, onClose, classes } = this.props;
    return (
      <Modal
        disableBackdropClick
        open={Boolean(open)}
        onClose={onClose}
      >
        <div className={classes.paper}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography align="left" variant="title" color="inherit" style={{ flex: 1 }}>
                Add Stadium
              </Typography>
              <IconButton onClick={this.handleCloseClick}>
                <CloseIcon style={{ color: 'white' }} />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Typography component="div" className={classes.content}>
            <AddForm onClose={onClose} />
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
    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  content: {
    padding: theme.spacing.unit * 3,
    paddingTop: 0,
    paddingBottom: 0,
  },
});

const AddStadiumModalWrapped = withStyles(styles, { withTheme: true })(AddStadiumModal);

export default AddStadiumModalWrapped;

