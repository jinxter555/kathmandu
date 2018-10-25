import React, { Component } from 'react';
// compoents
import LoginApp from './LoginApp';
import ProgramApp from './ProgramApp';
import ProjectApp from './ProjectApp';
import ProcessApp from './ProcessApp';
import TaskApp from './TaskApp';

import { Container} from 'reactstrap';


// reduce
import {connect} from 'react-redux'

class MainApp extends Component {
  render() {
    const displayProjectApp = this.props.programId ? (
      <ProjectApp/>
    ):(
      <h1>no projects </h1>
    );

    const displayProcessApp = this.props.projectId ? (
      <ProcessApp/>
    ):(
      <h1>no processes </h1>
    );

    const displayTaskApp = this.props.processId ? (
      <TaskApp/>
    ):(
      <h1>no Tasks </h1>
    );


    return (
      <div id="main-app">
        <Container>
          <LoginApp/>
        </Container>
        <Container>
          <ProgramApp />
          {displayProjectApp}
        </Container>
        <Container>
          {displayProcessApp}
          {displayTaskApp}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    programId: state.programId,
    projectId: state.projectId,
    processId: state.processId,
    taskId: state.taskId,
  }
}
export default connect(mapStateToProps)(MainApp);
