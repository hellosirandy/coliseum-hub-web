import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

const addInput = ({
  error, onChange, label, classes, type,
}) => {
  return (
    <FormControl className={classes.margin} fullWidth>
      <InputLabel>{label}</InputLabel>
      <Input
        type={type}
        error={error}
        onChange={onChange}
      />
    </FormControl>
  );
};

const styles = theme => ({
  margin: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
});

addInput.defaultProps = {
  error: false,
  onChange: null,
  type: '',
};

addInput.propTypes = {
  error: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default withStyles(styles)(addInput);
