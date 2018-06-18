import React from 'react';
import PropTypes from 'prop-types';
import UUID from 'uuid-v4';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const addSelect = ({ onChange, value, items }) => {
  const content = items.map(item => (
    <MenuItem value={item} key={UUID()}>{item}</MenuItem>
  ));
  return (
    <FormControl fullWidth>
      <InputLabel>Tenants</InputLabel>
      <Select
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

export default addSelect;
