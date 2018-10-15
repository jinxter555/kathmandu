import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {connect} from 'react-redux'
import { addProjectByProgramIdMutation, getProgramQuery} from '../queries/queries';
import { Button } from 'reactstrap';
import {selectProject} from '../actions/projectActions'

class AddProject extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: null,
      description: null
    }
  }
  submitForm(e){
    e.preventDefault();
    this.props.addProjectByProgramIdMutation({
      variables: {
        id: this.props.programId,
        name: this.state.name,
        description: this.state.description
      },
      refetchQueries: [{ query: getProgramQuery, variables: { id: this.props.programId } }]
    }).then(response => {
      // select the current added project
      let projectId = response.data.addProjectByProgramId.id;
      if(projectId) {
        this.props.selectProject(projectId);
      }
    });
    document.getElementById("add-project").reset();
  }
  render() {
    return(
      <form id="add-project" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Project Name:</label>
          <input type="text" onChange={ (e) =>
            this.setState({name: e.target.value})
          }/>
        </div>

        <div className="field">
          <label>Description:</label>
          <input type="text" onChange={ (e) =>
            this.setState( {description: e.target.value} )
          }/>
        </div>
        <Button>+</Button>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    programId: state.programId,
    projectId: state.projectId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectProject: (projectId) => {
      dispatch(selectProject(projectId))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(addProjectByProgramIdMutation, {name: "addProjectByProgramIdMutation"}),
  graphql(getProgramQuery, {
    name: "getProgramQuery", 
    options: (props) => { return { variables: {id: props.programId}} }
  }),
)(AddProject);
