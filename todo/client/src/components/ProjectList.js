import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {connect} from 'react-redux'
import {getProgramQuery } from '../queries/queries';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {selectProject} from '../actions/projectActions'

const uuidv1 = require('uuid/v1')

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }

  setStateSlected(selected) {
    this.setState({
      selected: selected
    })
  }

  displayProjects() {
    let data = this.props.getProgramQuery;
    if(data.loading){
      return(<div>Loading Projects</div>)
    } else {
      return data.program.projects.map(project => {
        return (
          <ListGroup key={uuidv1()}>
            <ListGroupItem key={project.id} >
              <ProjectItem project={project} 
                selectProject={this.props.selectProject} 
                />
            </ListGroupItem>
          </ListGroup>
        )
      });
    }
  }
  render() {
    var description = this.state.selected ? (
      this.state.selected
    ) : (
      <h1>No Description</h1>
    );
    var projectsListing = this.props.programId ? (
      this.displayProjects()
    ) : (
      <h1> nothing</h1>
    );
    return(
      <div>
        {projectsListing}
        {description}
      </div>
    );
  }
}


class ProjectItem extends Component {
  /*
  constructor(props) {
    super(props);
  }
  */
  render() {
    let project = this.props.project;
    let selectProject = this.props.selectProject;
    return(
      <div>
        <span  onClick = {(e) => {
          selectProject(project.id);
         }}> {project.name} {project.id} </span>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    programId: state.programId,
  }
}

// store.dispatch({action payload)
const mapDispatchToProps = (dispatch) => {
  return {
    selectProject: (projectId) => {
      console.log(projectId)
      dispatch(selectProject(projectId))
    }
  }
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(getProgramQuery, {
    name: "getProgramQuery",
    options: (props) => { return { variables: {id: props.programId}} }
  })
)(ProjectList);