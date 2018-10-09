import React, { Component } from 'react';
// compoents
import ProgramApp from './ProgramApp';
import ProjectApp from './ProjectApp';

// reduce
import {connect} from 'react-redux'

class MainApp extends Component {
  render() {
    const displayProjectApp = this.props.programId ? (
      <ProjectApp/>
    ):(
      <h1>no projects </h1>
    );

    return (
      <div id="main-app">
        <ProgramApp />
        {displayProjectApp}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    programId: state.programId,
  }
}
export default connect(mapStateToProps)(MainApp);