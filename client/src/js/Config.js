import React, { Component } from 'react';
import {
  Route,
  HashRouter,
  BrowserRouter,
  Redirect
} from 'react-router-dom';
import { LoginProvider } from '../config/contextConfig';
import Dashboard from './Dashboard/Dashboard';
import Login from './Components/Login';
import Signup from './Components/Signup';

const Config = () => (
  <Main />
);

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

  isLogin = () => {
    console.log("In isLogin fn", this.state)
    if (this.state.login) {
      console.log("In /If/ isLogin fn", this.state)
      sessionStorage.setItem('user', false);
    } else {
      console.log("In /else/ isLogin fn", this.state)      
      sessionStorage.setItem('user', true); }
    this.setState(state => ({
      login: !state.login
    }));
    console.log('app.js ===>', this.state.login);
  }

  render() {
    return (
      <LoginProvider value={this.state}>
        <BrowserRouter>
          {
            (this.state.login) ? (
              <Route exact path="/" component={Dashboard} />
            ) : (
                <>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                </>
              )
          }
        </BrowserRouter>
      </LoginProvider>
    );
  }
}


export default (Config);
