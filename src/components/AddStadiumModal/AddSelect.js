import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import UUID from 'uuid-v4';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const addSelect = ({
  onChange, value, items, classes,
}) => {
  const content = items.map(item => (
    <MenuItem value={item} key={UUID()}>{item}</MenuItem>
  ));
  return (
    <FormControl fullWidth className={classes.margin}>
      <InputLabel>Tenants</InputLabel>
      <Select
        gutterBottom
        multiple
        fullWidth
        value={value}
        onChange={onChange}
        inputProps={{
          name: 'age',
          id: 'age-simple',
        }}
      >
        {content}
      </Select>
    </FormControl>
  );
};

const styles = theme => ({
  margin: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
});

addSelect.defaultProps = {
  onChange: null,
  value: [],
  items: [],
};

addSelect.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.arrayOf(PropTypes.string),
};

export default withStyles(styles)(addSelect);
