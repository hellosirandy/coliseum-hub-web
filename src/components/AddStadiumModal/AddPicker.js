import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const addPicker = ({ classes, label }) => {
  return (
    <TextField
      label={label}
      type="date"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      className={classes.margin}
    />
  );
};

const styles = theme => ({
  margin: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
});

addPicker.propTypes = {
  label: PropTypes.string.isRequired,
};

export default withStyles(styles)(addPicker);
