import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {connect} from 'react-redux'
import { getProcessQuery, delTaskMutation } from '../queries/queries';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import {selectTask} from '../actions/taskActions'

const uuidv1 = require('uuid/v1')

class TaskList extends Component {
  deleteTask(taskId) {
    if(this.props.delTaskMutation===undefined) { return null}
    if(!taskId) {console.log("no taskId")}
    this.props.delTaskMutation({
      variables: {
        id: taskId
      },
      refetchQueries: [{ query: getProcessQuery, variables: { id: this.props.processId } }]
    }).catch(function(error) {
      console.log(error);
      alert("can't delete taslk ")
    });
  }

  displayTasks() {
    let data = this.props.getProcessQuery;
    if(data.loading){
      return(<div>Loading Tasks</div>)
    } else {
      return data.process.tasks.map(task => {
        return (
          <ListGroup key={uuidv1()}>
            <ListGroupItem key={task.id} >
              <TaskItem task={task}
                selectTask={this.props.selectTask}
                deleteTask={this.deleteTask.bind(this, task.id)}
                />
            </ListGroupItem>
          </ListGroup>
        )
      });
    }
  }

  render() {
    var taskListing = this.props.processId ? (
      this.displayTasks()
    ) : (
      <h1> nothing</h1>
    );
    return(
      <div>
        {taskListing}
      </div>
    );
  }
}


class TaskItem extends Component {
  onClickDelete(id) {
    this.props.deleteTask(id)
    this.props.selectTask(null)
  }
  render() {
    let task = this.props.task;
    let selectTask = this.props.selectTask;

    return(
      <div>
        <span  onClick = {(e) => {
          selectTask(task.id);
         }}> {task.description} {task.id} </span>
        <Button
          className="pull-right"
          color="danger"
          onClick={this.onClickDelete.bind(this, task.id)}
        >
          <span className="glyphicon glyphicon-remove"></span>
          {' '}Delete
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    processId: state.processId,
    taskId: state.taskId,
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
  graphql(delTaskMutation, {name: "delTaskMutation"}),
  graphql(getProcessQuery, {
    name: "getProcessQuery",
    options: (props) => { return { variables: {id: props.processId}} }
  })
)(TaskList);