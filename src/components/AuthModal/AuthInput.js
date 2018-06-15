import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

const authInput = ({
  error, icon, onChange, label, classes, type,
}) => {
  return (
    <FormControl className={classes.margin} fullWidth>
      <InputLabel>{label}</InputLabel>
      <Input
        type={type}
        error={error}
        onChange={onChange}
        startAdornment={
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

const styles = theme => ({
  margin: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
});

authInput.defaultProps = {
  error: false,
  onChange: null,
  type: '',
};

authInput.propTypes = {
  error: PropTypes.bool,
  icon: PropTypes.element.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default withStyles(styles)(authInput);
