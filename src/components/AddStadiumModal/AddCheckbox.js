import React from 'react';
import UUID from 'uuid-v4';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';

class AddCheckbox extends React.Component {
  state = {
    controls: {},
  };

  handleChange = name => (event) => {
    const { checked } = event.target;
    this.setState((prevState) => {
      return {
        ...prevState,
        controls: {
          ...prevState.controls,
          [name]: checked,
        },
      };
    });
  };

  render() {
    const {
      label, items, onChange, controls,
    } = this.props;
    const content = items.map((item, index) => (
      <div key={UUID()}>
        <FormGroup row>
          {item.map(it => (
            <FormControlLabel
              key={UUID()}
              control={
                <Checkbox
                  checked={controls && controls[it]}
                  onChange={onChange(it)}
                  value={it}
                />
              }
              label={it}
            />
          ))}
        </FormGroup>
        {index !== items.length - 1 ? <Divider /> : null}
      </div>
    ));
    return (
      <FormControl component="fieldset">
        <FormHelperText>{label}</FormHelperText>
        {content}
      </FormControl>
    );
  }
}

AddCheckbox.defaultProps = {
  items: [],
};

AddCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func.isRequired,
};

export default AddCheckbox;
