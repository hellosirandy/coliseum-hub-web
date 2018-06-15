import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

const store = configureStore();

const RRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<RRedux />, document.getElementById('root'));
registerServiceWorker();
