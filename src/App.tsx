import React, { Component } from 'react';
import './App.css';

import { Login } from './Login/Login';
import { Main } from './Main/Main';
import { proxy } from './Service/proxy';

export default class App extends Component {
  state = { loggedIn: false };

  render() {
    return (
      <div className="App">
        {this.state.loggedIn ? <Main /> : <Login />}
      </div>
    );
  }

  componentDidMount() {
    proxy.addEventListener("login", ()=> {
      this.setState({loggedIn: true});
    });
  }

  componentWillUnmount() {
    proxy.removeAllEventListener(this);
  }
}