import React from 'react';
import { connect } from 'react-redux';
import { addStadium } from '../../store/actions/index';
import AddInput from './AddInput';
import AddSelection from './AddCheckbox';
import AddPicker from './AddPicker';
import AddImages from './AddImages';
import SubmitButton from '../UI/SubmitButton';
import { sports, getLeagues } from '../../utils/index';

class AddForm extends React.Component {
  state = {
    controls: {
      name: '',
      sports: {},
      leagues: {},
      images: [],
    },
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
  handleSelectChange = key => value => (event) => {
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
    return (
      <div style={styles.container}>
        <AddInput label="Name" onChange={this.handleInputChange('name')} />
        <AddInput label="Location" onChange={this.handleInputChange('location')} />
        <AddSelection
          label="Sport"
          items={[sports]}
          onChange={this.handleSelectChange('sport')}
          controls={controls.sport}
        />
        {leagues.length > 0 ? (
          <AddSelection
            label="League"
            items={leagues}
            onChange={this.handleSelectChange('league')}
            controls={controls.league}
          />
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

