import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {connect} from 'react-redux'
import {getProgramsQuery, getProgramQuery, delProjectMutation } from '../queries/queries';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import {selectProject} from '../actions/projectActions'

const uuidv1 = require('uuid/v1')

class ProjectList extends Component {
  deleteProject(projectId) {
    if(!projectId) {console.log("no project Id")}
    console.log("programId: "+ this.props.programId)
    console.log("projectId: "+ projectId)
    console.dir(this.props)
    this.props.delProjectMutation({
      variables: {
        id: projectId
      },
      refetchQueries: [{ query: getProgramQuery, variables: { id: this.props.programId } }]
    })
    console.log("hello world")
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
                deleteProject={this.deleteProject.bind(this, project.id)}
                />
            </ListGroupItem>
          </ListGroup>
        )
      });
    }
  }
  render() {
    var projectsListing = this.props.programId ? (
      this.displayProjects()
    ) : (
      <h1> nothing</h1>
    );
    return(
      <div>
        {projectsListing}
      </div>
    );
  }
}


class ProjectItem extends Component {
  onClickDelete(id) {
    this.props.selectProject(null);
    this.props.deleteProject(id);
  }
  render() {
    let project = this.props.project;
    let selectProject = this.props.selectProject;

    return(
      <div>
        <span  onClick = {(e) => {
          selectProject(project.id);

         }}> {project.name} {project.id} </span>
        <Button
          className="pull-right"
          color="danger"
          onClick={this.onClickDelete.bind(this, project.id)}
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
  graphql(delProjectMutation, {name: "delProjectMutation"}),
  graphql(getProgramsQuery, {name: "getProgramsQuery"}),
  graphql(getProgramQuery, {
    name: "getProgramQuery",
    options: (props) => { return { variables: {id: props.programId}} }
  })
)(ProjectList);
