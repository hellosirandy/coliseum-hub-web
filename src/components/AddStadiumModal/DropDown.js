import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ImageIcon from '@material-ui/icons/Image';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const DropDown = ({ anchorEl, onClose, onURLClick }) => {
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
      <MenuItem onClick={() => { onURLClick(); onClose(); }}>
        <ListItemIcon>
          <InsertLinkIcon />
        </ListItemIcon>
        <ListItemText inset primary="URL" />
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <ImageIcon />
        </ListItemIcon>
        <ListItemText inset primary="Select" />
      </MenuItem>

    </Menu>
  );
};

export const InputDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">Input URL</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Image URL"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
