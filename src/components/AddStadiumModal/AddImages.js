import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const AddButton = styled.button`
  padding: 30%;
  border-style: dashed;
  border-width: 2px;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

const addImages = ({ classes }) => {
  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormHelperText component="legend">Upload Photos</FormHelperText>
      <FormGroup row>
        <Grid container spacing={24} className={classes.grid}>
          <Grid item xs={3}>
            <AddButton
              className={classes.button}
              onClick={() => {
                this.fileInput.click();
              }}
            >
              <CloudUploadIcon className={classes.icon} color="primary" />
              <input
                type="file"
                className={classes.fileInput}
                ref={(ref) => {
                  this.fileInput = ref;
                }}
              />
            </AddButton>
          </Grid>
        </Grid>
      </FormGroup>
    </FormControl>
  );
};

const styles = theme => ({
  icon: {
    width: '100%',
    height: '100%',
  },
  button: {
    borderColor: theme.palette.primary.main,
  },
  formControl: {
    width: '100%',
  },
  grid: {
    marginTop: 0,
  },
  fileInput: {
    display: 'none',
  },
});

export default withStyles(styles)(addImages);

