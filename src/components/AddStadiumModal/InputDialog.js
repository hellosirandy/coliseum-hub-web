import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class InputDialog extends React.PureComponent {
  state = {
    url: '',
  }
  handleURLChange = (event) => {
    this.setState({ url: event.target.value });
  }
  handleConfirmClick = () => {
    const { onConfirmClick, onClose } = this.props;
    const { url } = this.state;
    onConfirmClick(url);
    this.setState({ url: '' }, () => {
      onClose();
    });
  }
  render() {
    const { open, onClose } = this.props;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Input URL</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            onChange={this.handleURLChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleConfirmClick} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

InputDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmClick: PropTypes.func.isRequired,
};

export default InputDialog;
