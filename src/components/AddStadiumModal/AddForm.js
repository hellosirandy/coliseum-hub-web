import React from 'react';
import { connect } from 'react-redux';
import GoogleMaps from '@google/maps';
import { addStadium } from '../../store/actions/index';
import AddInput from './AddInput';
import AddSelection from './AddCheckbox';
import AddPicker from './AddPicker';
import AddImages from './AddImages';
import SubmitButton from '../UI/SubmitButton';
import AddSelect from './AddSelect';
import { sports, getLeagues, getTeams } from '../../utils/index';
import { getCity } from '../../utils/stadium';

class AddForm extends React.Component {
  state = {
    controls: {
      name: '',
      sport: {},
      league: {},
      tenants: [],
      images: [],
    },
  }
  componentDidMount() {
    getCity(25.0424415, 121.5573179).then((res) => {
      console.log(res);
    });
  }
  handleInputChange = key => (event) => {
    const { value } = event.target;
    this.setState((prevState) => {
      return {
        ...prevState,
        controls: {
          ...prevState.controls,
          [key]: value,
        },
      };
    });
  }
  handleCheckboxChange = key => value => (event) => {
    const { checked } = event.target;
    this.setState((prevState) => {
      return {
        ...prevState,
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            [value]: checked,
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
    await this.props.onAddStadium(stadium);
    this.props.onClose();
  }
  render() {
    const { controls } = this.state;
    const { images } = controls;
    const { isLoading } = this.props;
    const leagues = getLeagues(controls.sport);
    const teams = getTeams(controls.league);
    return (
      <div style={styles.container}>
        <AddInput label="Name" onChange={this.handleInputChange('name')} />
        <AddInput label="Location" onChange={this.handleInputChange('location')} />
        <AddSelection
          label="Sport"
          items={[sports]}
          onChange={this.handleCheckboxChange('sport')}
          controls={controls.sport}
        />
        {leagues.length > 0 ? (
          <AddSelection
            label="League"
            items={leagues}
            onChange={this.handleCheckboxChange('league')}
            controls={controls.league}
          />
        ) : null}
        {teams.length > 0 ? (
          <AddSelect onChange={this.handleSelectChange} items={teams} value={controls.tenants} />
        ) : null}
        <AddInput label="Capacity" type="number" />
        <AddInput label="Architect" />
        <AddPicker label="Opened" />
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

