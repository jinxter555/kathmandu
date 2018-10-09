import React, { Component } from 'react';
// compoents
import ProjectList from './components/ProjectList';
import AddProject from './components/AddProject';

export default class ProjectApp extends Component {
  render() {
    return (
      <div id="main_project" className="col-sm-4">
        <h1>Project listing</h1>
        <ProjectList />
        <AddProject />
      </div>
    );
  }
}
