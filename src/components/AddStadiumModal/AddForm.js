import React from 'react';
import { connect } from 'react-redux';
import { addStadium } from '../../store/actions/index';
import AddInput from './AddInput';
import AddPicker from './AddPicker';
import AddImages from './AddImages';
import SubmitButton from '../UI/SubmitButton';

class AddForm extends React.Component {
  state = {
    controls: {
      images: [],
    },
  }
  handleImagesChange = (newImage) => {
    this.setState({
      controls: {
        ...this.state.controls,
        images: [...this.state.controls.images, newImage],
      },
    });
  }
  handleSubmitButtonClick = () => {
    const { images } = this.state.controls;
    const stadium = {
      images,
    };
    this.props.onAddStadium(stadium);
  }
  render() {
    const { controls } = this.state;
    const { images } = controls;
    return (
      <div style={styles.container}>
        <AddInput label="Name" />
        <AddInput label="Location" />
        <AddInput label="Capacity" type="number" />
        <AddInput label="Architect" />
        <AddPicker label="Opened" />
        <AddImages label="Images" images={images} onChange={this.handleImagesChange} />
        <SubmitButton onClick={this.handleSubmitButtonClick} />
      </div>
    );
  }
}

const styles = {
  container: {
    maxHeight: 500,
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddStadium: stadium => dispatch(addStadium(stadium)),
  };
};

export default connect(null, mapDispatchToProps)(AddForm);

