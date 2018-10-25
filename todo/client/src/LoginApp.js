import React, { Component } from 'react';
// compoents
import AppUserLogin from './components/AppUserLogin';

export default class LoginApp extends Component {
  render() {
    return (
      <div id="main_login" className="col-sm-4">
        <h1>Login </h1>
        <AppUserLogin />
      </div>
    );
  }
}
