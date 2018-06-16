import React from 'react';
import AddInput from './AddInput';
import AddPicker from './AddPicker';
import AddImages from './AddImages';

const addForm = () => {
  return (
    <div>
      <AddInput label="Name" />
      <AddInput label="Location" />
      <AddInput label="Capacity" type="number" />
      <AddInput label="Architect" />
      <AddPicker label="Opened" />
      <AddImages label="Images" />
    </div>
  );
};

export default addForm;

