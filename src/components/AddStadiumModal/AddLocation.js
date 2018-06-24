import React from 'react';

import Grid from '@material-ui/core/Grid';
import AddInput from './AddInput';

const addLocation = ({ onChange, error }) => {
  return (
    <Grid container spacing={16}>
      <Grid item xs={6}>
        <AddInput error={error} type="number" label="Latitude" onChange={event => onChange('latitude', event)} />
      </Grid>
      <Grid item xs={6}>
        <AddInput error={error} type="number" label="Longitude" onChange={event => onChange('longitude', event)} />
      </Grid>
    </Grid>
  );
};

export default addLocation;
