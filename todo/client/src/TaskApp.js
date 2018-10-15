import React, { Component } from 'react';
// compoents
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

export default class TaskApp extends Component {
  render() {
    return (
      <div id="main_task" className="col-sm-4">
        <h1>Task listing</h1>
        <TaskList />
        <AddTask />
      </div>
    );
  }
}
