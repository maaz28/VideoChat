import React, { Component } from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
import Config from './Config';

class App extends Component {
  render() {
    return (
      <Config />
    );
  }
}

render(<App />, document.getElementById('root'));
