import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const addPicker = ({ classes, label, onChange }) => {
  return (
    <TextField
      label={label}
      type="date"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      className={classes.margin}
      onChange={onChange}
    />
  );
};

const styles = theme => ({
  margin: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
});

addPicker.defaultProps = {
  onChange: null,
};

addPicker.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default withStyles(styles)(addPicker);
