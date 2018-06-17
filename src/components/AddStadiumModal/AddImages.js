import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import UUID from 'uuid-v4';
import PropTypes from 'prop-types';
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

class AddImages extends React.Component {
  handleFileInputChange = (event) => {
    const { files } = event.target;
    for (let i = 0; i < files.length; i += 1) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = () => {
        const newImage = {
          key: UUID(),
          base64: reader.result,
          name: files[i].name,
          src: reader.result,
        };
        this.props.onChange(newImage);
      };
    }
  }
  render() {
    const { classes, images } = this.props;
    const renderImages = images.map(image => (
      <Grid item xs={3} key={image.key} >
        <img className={classes.image} src={image.src} alt="stadium" />
      </Grid>
    ));
    return (
      <FormControl component="fieldset" className={classes.formControl}>
        <FormHelperText component="legend">Upload Photos</FormHelperText>
        <FormGroup row>
          <Grid container spacing={24} className={classes.grid}>
            {renderImages}
            <Grid item xs={3}>
              <AddButton
                className={classes.button}
                onClick={() => {
                  this.fileInput.click();
                }}
              >
                <CloudUploadIcon className={classes.image} color="primary" />
                <input
                  type="file"
                  className={classes.fileInput}
                  ref={(ref) => {
                    this.fileInput = ref;
                  }}
                  multiple
                  onChange={this.handleFileInputChange}
                />
              </AddButton>
            </Grid>
          </Grid>
        </FormGroup>
      </FormControl>
    );
  }
}

const styles = theme => ({
  image: {
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

AddImages.defaultProps = {
  images: [],
  onChange: null,
};

AddImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
};

export default withStyles(styles)(AddImages);

