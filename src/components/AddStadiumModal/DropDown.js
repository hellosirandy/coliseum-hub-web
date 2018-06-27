import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ImageIcon from '@material-ui/icons/Image';
import InsertLinkIcon from '@material-ui/icons/InsertLink';

class DropDown extends React.PureComponent {
  handleLinkClick = () => {
    const { onURLClick, onClose } = this.props;
    onURLClick();
    onClose();
  }
  handleFileClick = () => {
    const { onFileClick, onClose } = this.props;
    onFileClick();
    onClose();
  }
  render() {
    const { anchorEl, onClose } = this.props;
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
        <MenuItem onClick={this.handleLinkClick}>
          <ListItemIcon>
            <InsertLinkIcon />
          </ListItemIcon>
          <ListItemText inset primary="URL" />
        </MenuItem>
        <MenuItem onClick={this.handleFileClick}>
          <ListItemIcon>
            <ImageIcon />
          </ListItemIcon>
          <ListItemText inset primary="File" />
        </MenuItem>

      </Menu>
    );
  }
}

DropDown.propTypes = {
  onClose: PropTypes.func.isRequired,
  onURLClick: PropTypes.func.isRequired,
  onFileClick: PropTypes.func.isRequired,
};

export default DropDown;

