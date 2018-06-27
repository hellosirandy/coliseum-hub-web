import React from 'react';
import { connect } from 'react-redux';
import { addStadium } from '../../store/actions/index';
import AddInput from './AddInput';
import AddCheckbox from './AddCheckbox';
import AddPicker from './AddPicker';
import AddImages from './AddImages';
import SubmitButton from '../UI/SubmitButton';
import AddSelect from './AddSelect';
import AddLocation from './AddLocation';
import {
  sportNames,
  getLeagues,
  getTeams,
  formatStadium,
  validate,
  validateForm,
  loadingTypes,
  tournamentNames,
} from '../../utils/index';

class AddForm extends React.Component {
  state = {
    controls: {
      name: {
        value: '',
        valid: false,
        validationRules: ['notEmpty'],
      },
      location: {
        value: {},
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
      sports: {
        value: {},
        valid: false,
        validationRules: ['objectNotEmpty'],
      },
      leagues: {
        value: {},
        valid: true,
        validationRules: [],
      },
      tenants: {
        value: [],
        valid: true,
      },
      tournaments: {
        value: [],
        valid: true,
      },
      images: {
        value: [],
        valid: true,
      },
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
  handleLocationChange = (key, event) => {
    const { value } = this.state.controls.location;
    value[key] = event.target.value;
    this.setState((prevState) => {
      return {
        ...prevState,
        controls: {
          ...prevState.controls,
          location: {
            ...prevState.controls.location,
            value,
            valid: validate(value, prevState.controls.location.validationRules),
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
  handleSelectChange = key => (event) => {
    const { value } = event.target;
    this.setState((prevState) => {
      return {
        ...prevState,
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value,
          },
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
          images: {
            ...prevState.controls.images,
            value: [...prevState.controls.images.value, newImage],
          },
        },
      };
    });
  }
  handleSubmitButtonClick = async () => {
    this.setState({ submitted: true });
    const { controls } = this.state;
    const valid = validateForm(controls);
    if (!valid) {
      return;
    }
    const { onAddStadium, onClose } = this.props;
    const stadium = formatStadium(controls);
    await onAddStadium(stadium);
    onClose();
  }
  render() {
    const { controls, submitted } = this.state;
    const {
      images, name, location, capacity, architect, sports, leagues, tenants, tournaments,
    } = controls;
    const { isLoading } = this.props;
    const allLeagues = getLeagues(sports.value);
    const allTeams = getTeams(leagues.value);
    return (
      <div style={styles.container}>
        <AddInput label="Name" onChange={this.handleInputChange('name')} error={!name.valid && submitted} />
        {/* <AddInput label="Location" onChange={this.handleInputChange('location')} error={!location.valid && submitted} /> */}
        <AddLocation onChange={this.handleLocationChange} error={!location.valid && submitted} />
        <AddCheckbox
          label="Sport"
          items={[sportNames]}
          onChange={this.handleCheckboxChange('sports')}
          value={sports.value}
          error={!sports.valid && submitted}
        />
        {allLeagues.length > 0 ? (
          <AddCheckbox
            label="League"
            items={allLeagues}
            onChange={this.handleCheckboxChange('leagues')}
            value={leagues.value}
          />
        ) : null}
        {allTeams.length > 0 ? (
          <AddSelect
            onChange={this.handleSelectChange('tenants')}
            items={allTeams}
            value={tenants.value}
            label="Tenants"
          />
        ) : null}
        <AddSelect
          onChange={this.handleSelectChange('tournaments')}
          items={tournamentNames}
          label="Tournaments"
          value={tournaments.value}
        />
        <AddInput label="Capacity" type="number" onChange={this.handleInputChange('capacity')} error={!capacity.valid && submitted} />
        <AddInput label="Architect" onChange={this.handleInputChange('architect')} error={!architect.valid && submitted} />
        <AddPicker label="Opened" onChange={this.handleInputChange('open')} />
        <AddImages label="Images" images={images.value} onChange={this.handleImagesChange} />
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
    isLoading: state.ui.isLoading[loadingTypes.addStadium],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddStadium: stadium => dispatch(addStadium(stadium)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);

