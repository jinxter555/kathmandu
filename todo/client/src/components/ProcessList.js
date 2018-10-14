import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {connect} from 'react-redux'
import {getProjectQuery } from '../queries/queries';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import {selectProcess} from '../actions/processActions'

const uuidv1 = require('uuid/v1')

class ProcessList extends Component {
  deleteProcess(processId) {
    console.log(processId)
  }

  displayProcesses() {
    let data = this.props.getProjectQuery;
    if(data.loading){
      return(<div>Loading Process</div>)
    } else {
      return data.project.processes.map(work_process => {
        return (
          <ListGroup key={uuidv1()}>
            <ListGroupItem key={work_process.id} >
              <ProcessItem work_process={work_process}
                selectProcess={this.props.selectProcess}
                deleteProcess={this.deleteProcess}
                />
            </ListGroupItem>
          </ListGroup>
        )
      });
    }
  }
  render() {
    var processesListing = this.props.projectId ? (
      this.displayProcesses()
    ) : (
      <h1> nothing</h1>
    );
    return(
      <div>
        {processesListing}
      </div>
    );
  }
}


class ProcessItem extends Component {
  onClickDelete(id) {
    this.props.deleteProcess(id)
  }
  render() {
    let work_process = this.props.work_process;
    let selectProcess = this.props.selectProcess;

    return(
      <div>
        <span  onClick = {(e) => {
          selectProcess(work_process.id);
         }}> {work_process.name} {work_process.id} </span>
        <Button
          className="pull-right"
          color="danger"
          onClick={this.onClickDelete.bind(this, work_process.id)}
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
    projectId: state.projectId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectProcess: (processId) => {
      dispatch(selectProcess(processId))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(getProjectQuery, {
    name: "getProjectQuery",
    options: (props) => { return { variables: {id: props.projectId}} }
  })
)(ProcessList);
