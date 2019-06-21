import React, { Component } from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
import Dashboard from './Dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <Dashboard/>
    );
  }
}

render(<App />, document.getElementById('root'));
