import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import mainTheme from './themes/main';

class App extends Component {
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

export default App;
