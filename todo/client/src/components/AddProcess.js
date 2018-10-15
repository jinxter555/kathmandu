import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {connect} from 'react-redux'
import { addProcessByProjectIdMutation, getProjectQuery} from '../queries/queries';
import { Button } from 'reactstrap';
import {selectProcess} from '../actions/processActions'

class AddProcess extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: null,
      description: null
    }
  }
  submitForm(e){
    e.preventDefault();
    this.props.addProcessByProjectIdMutation({
      variables: {
        id: this.props.projectId,
        name: this.state.name,
        description: this.state.description
      },
      refetchQueries: [{ query: getProjectQuery, variables: { id: this.props.projectId } }]
    }).then(response => {
      // select the current added process
      let processId = response.data.addProcessByProjectId.id;
      if(processId) {
        this.props.selectProcess(processId);
      }
    });
    document.getElementById("add-process").reset();
  }
  render() {
    return(
      <form id="add-process" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Process Name:</label>
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
    processId: state.processId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectProcess: (projectId) => {
      dispatch(selectProcess(projectId))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(addProcessByProjectIdMutation, {name: "addProcessByProjectIdMutation"}),
  graphql(getProjectQuery, {
    name: "getProjectQuery",
    options: (props) => { return { variables: {id: props.projectId}} }
  }),
)(AddProcess);
