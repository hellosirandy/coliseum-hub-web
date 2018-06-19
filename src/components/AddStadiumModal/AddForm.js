import React from 'react';
import { connect } from 'react-redux';
import { addStadium } from '../../store/actions/index';
import AddInput from './AddInput';
import AddCheckbox from './AddCheckbox';
import AddPicker from './AddPicker';
import AddImages from './AddImages';
import SubmitButton from '../UI/SubmitButton';
import AddSelect from './AddSelect';
import { sports, getLeagues, getTeams, validate } from '../../utils/index';

class AddForm extends React.Component {
  state = {
    controls: {
      name: {
        value: '',
        valid: false,
        validationRules: ['notEmpty'],
      },
      location: {
        value: '',
        valid: false,
        validationRules: ['location'],
      },
      capacity: {
        value: '',
        valid: false,
        validationRules: ['notEmpty'],
      },
      architect: {
        value: '',
        valid: true,
        validationRules: [],
      },
      open: {
        value: '',
        valid: true,
        validationRules: [],
      },
      sport: {
        value: {},
        valid: false,
        validationRules: ['objectNotEmpty'],
      },
      league: {
        value: {},
        valid: true,
      },
      tenants: [],
      images: [],
    },
    submitted: false,
  }
  handleInputChange = key => (event) => {
    const { value } = event.target;
    this.setState((prevState) => {
      return {
        ...prevState,
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value,
            valid: validate(value, prevState.controls[key].validationRules),
          },
        },
      };
    });
  }
  handleCheckboxChange = control => key => (event) => {
    const { checked } = event.target;
    const value = {
      ...this.state.controls[control].value,
      [key]: checked,
    };
    this.setState((prevState) => {
      return {
        ...prevState,
        controls: {
          ...prevState.controls,
          [control]: {
            ...prevState.controls[control],
            value,
            valid: validate(value, prevState.controls[control].validationRules),
          },
        },
      };
    });
  }
  handleSelectChange = (event) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        controls: {
          ...prevState.controls,
          tenants: event.target.value,
        },
      };
    });
  }
  handleImagesChange = (newImage) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        controls: {
          ...prevState.controls,
          images: [...prevState.controls.images, newImage],
        },
      };
    });
  }
  handleSubmitButtonClick = async () => {
    const { images } = this.state.controls;
    const stadium = {
      images,
    };
    this.setState({ submitted: true });
    // await this.props.onAddStadium(stadium);
    // this.props.onClose();
  }
  render() {
    const { controls, submitted } = this.state;
    const {
      images, name, location, capacity, architect, sport, league,
    } = controls;
    const { isLoading } = this.props;
    const leagues = getLeagues(controls.sport.value);
    const teams = getTeams(controls.league.value);
    return (
      <div style={styles.container}>
        <AddInput label="Name" onChange={this.handleInputChange('name')} error={!name.valid && submitted} />
        <AddInput label="Location" onChange={this.handleInputChange('location')} error={!location.valid && submitted} />
        <AddCheckbox
          label="Sport"
          items={[sports]}
          onChange={this.handleCheckboxChange('sport')}
          value={sport.value}
          error={!sport.valid && submitted}
        />
        {leagues.length > 0 ? (
          <AddCheckbox
            label="League"
            items={leagues}
            onChange={this.handleCheckboxChange('league')}
            value={league.value}
          />
        ) : null}
        {teams.length > 0 ? (
          <AddSelect onChange={this.handleSelectChange} items={teams} value={controls.tenants} />
        ) : null}
        <AddInput label="Capacity" type="number" onChange={this.handleInputChange('capacity')} error={!capacity.valid && submitted} />
        <AddInput label="Architect" onChange={this.handleInputChange('architect')} error={!architect.valid && submitted} />
        <AddPicker label="Opened" onChange={this.handleInputChange('open')} />
        <AddImages label="Images" images={images} onChange={this.handleImagesChange} />
        <SubmitButton onClick={this.handleSubmitButtonClick} isLoading={isLoading} />
      </div>
    );
  }
}

const styles = {
  container: {
    maxHeight: 600,
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.ui.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddStadium: stadium => dispatch(addStadium(stadium)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);

