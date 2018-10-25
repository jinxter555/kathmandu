import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {connect} from 'react-redux'
import {getProgramsQuery, delProgramMutation} from '../queries/queries';
import ProgramDetails from './ProgramDetails';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import {selectProgram} from '../actions/programActions'

const uuidv1 = require('uuid/v1')

class ProgramList extends Component {
  //constructor(props) {
  //  super(props);
  //}

  deleteProgram(programId) {
    console.log("delete: " + programId);
    this.props.delProgramMutation({
      variables: {
        id: programId
      },
      refetchQueries: [{ query: getProgramsQuery}]
    }).catch(function(error) {
      console.log(error);
      alert("there are projects still referencing this program")
    });
  }

  displayPrograms() {
    // let data = this.props.data;
    let data = this.props.getProgramsQuery;
    if(data.loading){
      return(<div>Loading Programs</div>)
    } else {
      //if(!data.program) { return(<h1> nothing program</h1>) }
      return data.programs.map(program => {
        return (
          <ListGroup key={uuidv1()}>
            <ListGroupItem key={program.id} >
            <ProgramItem
              program={program}
              selectProgram={this.props.selectProgram}
              deleteProgram={this.deleteProgram.bind(this, program.id)}
            />
            </ListGroupItem>
          </ListGroup>
        )
      });
    }
  }
  render() {
    var description = this.props.programId ? (
      <ProgramDetails programId = {this.props.programId} />
    ) : (
      <h1>No Description</h1>
    );
    //setInterval(this.props.getProgramsQuery.refetch , 5000)
    return(
      <div>
        {this.displayPrograms()}
        {description}
      </div>
    );
  }
}

class ProgramItem extends Component {
  onClickDelete(id) {
    this.props.deleteProgram(id)
    this.props.selectProgram(null)
  }
  render() {
    let program = this.props.program;
    return(
      <div>
        <span  onClick = {(e) => {
          this.props.selectProgram(program.id)
         }}> {program.name} </span>

        <Button className="pull-right" color="danger"
          onClick ={this.onClickDelete.bind(this, program.id)} >
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
  }
}

// store.dispatch({action payload)
const mapDispatchToProps = (dispatch) => {
  return {
    selectProgram: (programId) => {
      dispatch(selectProgram(programId))
    }
  }
}

// export default graphql(getProgramsQuery)(ProgramList);
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(delProgramMutation, {name: "delProgramMutation"}),
  graphql(getProgramsQuery, {name: "getProgramsQuery"}),
)(ProgramList);
