import React, { Component } from 'react';
// compoents
import ProcessList from './components/ProcessList';
import AddProcess from './components/AddProcess';

export default class ProcessApp extends Component {
  render() {
    return (
      <div id="main_process" className="col-sm-4">
        <h1>Process listing</h1>
        <ProcessList />
        <AddProcess />
      </div>
    );
  }
}
