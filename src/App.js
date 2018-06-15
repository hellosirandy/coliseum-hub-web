import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { authAutoSignIn } from './store/actions/index';
import mainTheme from './themes/main';

class App extends Component {
  componentDidMount() {
    this.props.onAuthAutoLogin();
  }
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={mainTheme}>
          <NavBar />
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthAutoLogin: () => dispatch(authAutoSignIn()),
  };
};

export default connect(null, mapDispatchToProps)(App);
