import React, { Component } from 'react';
// compoents
import ProgramList from './components/ProgramList';
import AddProgram from './components/AddProgram';

export default class ProgramApp extends Component {
  render() {
    return (
      <div id="main_program" className="col-sm-4">
        <h1>Program listing</h1>
        <ProgramList />
        <AddProgram />
      </div>
    );
  }
}