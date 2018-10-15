import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {connect} from 'react-redux'
import { addTaskByProcessIdMutation, getProcessQuery} from '../queries/queries';
import { Button } from 'reactstrap';
import {selectTask} from '../actions/taskActions'

class AddTask  extends Component {
  constructor(props){
    super(props);
    this.state = {
      description: null
    }
  }
  submitForm(e){
    e.preventDefault();
    this.props.addTaskByProcessIdMutation({
      variables: {
        id: this.props.processId,
        description: this.state.description
      },
      refetchQueries: [{ query: getProcessQuery, variables: { id: this.props.processId } }]
    }).then(response => {
      // select the current added task
      let taskId = response.data.addTaskByProcessId.id;
      if(taskId) {
        this.props.selectTask(taskId);
      }
    });
    document.getElementById("add-task").reset();
  }
  render() {
    return(
      <form id="add-task" onSubmit={this.submitForm.bind(this)}>
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
    taskId: state.taskId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectTask: (taskId) => {
      dispatch(selectTask(taskId))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(addTaskByProcessIdMutation, {name: "addTaskByProcessIdMutation"}),
  graphql(getProcessQuery, {
    name: "getProcessQuery",
    options: (props) => { return { variables: {id: props.processId}} }
  }),
)(AddTask);
