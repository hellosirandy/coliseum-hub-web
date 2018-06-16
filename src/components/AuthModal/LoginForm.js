import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { tryAuth } from '../../store/actions/index';
import AuthInput from './AuthInput';
import SubmitButton from '../UI/SubmitButton';

class LoginForm extends React.Component {
  state = {
    controls: {
      email: '',
      password: '',
    },
  }
  updateInputState = (key, event) => {
    const { value } = event.target;
    this.setState((prevState) => {
      return {
        controls: {
          ...prevState.controls,
          [key]: value,
        },
      };
    });
  }
  handleSubmitClick = () => {
    const authData = {
      email: this.state.controls.email,
      password: this.state.controls.password,
    };
    this.props.onTryAuth(authData);
  }
  render() {
    const { classes, authError, isLoading } = this.props;
    return (
      <div style={{ boxSizing: 'border-box' }}>
        <Typography className={classes.margin} variant="subheading" align="center">Welcome back!</Typography>
        <AuthInput
          error={Boolean(authError)}
          label="Email *"
          icon={<EmailIcon />}
          onChange={event => this.updateInputState('email', event)}
        />
        <AuthInput
          type="password"
          error={Boolean(authError)}
          label="Password *"
          icon={<LockIcon />}
          onChange={event => this.updateInputState('password', event)}
        />
        <SubmitButton isLoading={isLoading} onClick={this.handleSubmitClick} text="Login" />
      </div>
    );
  }
}

const styles = theme => ({
  margin: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
});

const mapStateToProps = (state) => {
  return {
    isLoading: state.ui.isLoading,
    authError: state.auth.authError,
    authStatus: state.auth.authStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAuth: authData => dispatch(tryAuth(authData)),
  };
};

const loginFormWrapper = withStyles(styles)(LoginForm);
export default connect(mapStateToProps, mapDispatchToProps)(loginFormWrapper);
