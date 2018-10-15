import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {connect} from 'react-redux'
import { getProcessQuery } from '../queries/queries';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import {selectTask} from '../actions/taskActions'

const uuidv1 = require('uuid/v1')

class TaskList extends Component {
  deleteTask(taskId) {
    console.log(taskId)
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
                deleteTask={this.deleteTask}
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
  graphql(getProcessQuery, {
    name: "getProcessQuery",
    options: (props) => { return { variables: {id: props.processId}} }
  })
)(TaskList);
