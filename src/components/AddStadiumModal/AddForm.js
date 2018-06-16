import React from 'react';
import AddInput from './AddInput';
import AddPicker from './AddPicker';
import AddImages from './AddImages';
import SubmitButton from '../UI/SubmitButton';

const addForm = () => {
  return (
    <div style={styles.container}>
      <AddInput label="Name" />
      <AddInput label="Location" />
      <AddInput label="Capacity" type="number" />
      <AddInput label="Architect" />
      <AddPicker label="Opened" />
      <AddImages label="Images" />
      <SubmitButton />
    </div>
  );
};

const styles = {
  container: {
    maxHeight: 500,
    overflow: 'scroll',
  },
};

export default addForm;

