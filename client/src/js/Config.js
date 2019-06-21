import React, { Component } from 'react';
import {
  Router,
  Route,
  HashRouter
} from 'react-router-dom';
import { LoginProvider } from '../config/contextConfig';
import Dashboard from './Dashboard/Dashboard';

const Config = () => {
  return (
    <HashRouter>
      <Main />
    </HashRouter>
  );
}

class Main extends Component {
  constructor(props) {
    super(props);
    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      login: JSON.parse(sessionStorage.getItem('user')) || false,
      isLogin: this.isLogin
    };
    this.isLogin = this.isLogin.bind(this);
  }

  isLogin() {
    if (this.state.login) {
      sessionStorage.setItem('user', false);
    } else { sessionStorage.setItem('user', true); }
    this.setState(state => ({
      login: !state.login
    }));
    console.log('app.js ===>', this.state.login);
  }

  render() {
    return (
      <LoginProvider value={this.state}>
        <Router>
          {
            (this.state.login) ? (
              <Route exact path="/" component={Dashboard} />
            ) : (
                <>
                  <Route exact path="/" component={Dashboard} />
                </>
              )
          }
        </Router>
      </LoginProvider>
    );
  }
}


export default (Config);
