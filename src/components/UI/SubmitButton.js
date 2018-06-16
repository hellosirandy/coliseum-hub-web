import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const submitButton = ({
  isLoading, classes, onClick, text,
}) => {
  return (
    <Button
      disabled={isLoading}
      variant="contained"
      color="secondary"
      className={classes.margin}
      fullWidth
      onClick={onClick}
    >
      {text}
      {isLoading && <CircularProgress color="secondary" size={24} className={classes.buttonProgress} />}
    </Button>
  );
};

const styles = theme => ({
  margin: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

submitButton.defaultProps = {
  isLoading: false,
  onClick: null,
  text: 'Submit',
};

submitButton.propTypes = {
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
};

export default withStyles(styles)(submitButton);

