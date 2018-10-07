import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {connect} from 'react-redux'
import {getProgramsQuery, delProgramMutation} from '../queries/queries';
import ProgramDetails from './ProgramDetails';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import {selectProgram} from '../actions/programActions'

const uuidv1 = require('uuid/v1')

class ProgramList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }
  onClickDelete = id => {
    console.log("delete: " + id);
    this.props.delProgramMutation({
      variables: {
        id: id
      },
      refetchQueries: [{ query: getProgramsQuery}]
    })
  }

  displayPrograms() {
    // let data = this.props.data;
    let data = this.props.getProgramsQuery;
    if(data.loading){
      return(<div>Loading Programs</div>)
    } else {
      return data.programs.map(program => {
        return (
          <ListGroup key={uuidv1()}>
            <ListGroupItem key={program.id} >
              <div>
                <span  onClick = {(e) => {
                  this.setState({
                    selected: program.id
                  })
                  this.props.selectProgram(program.id)
                 }}> {program.name} </span>
                <Button className="pull-right" color="danger" 
                  onClick ={this.onClickDelete.bind(this, program.id)} >
                  <span className="glyphicon glyphicon-remove"></span> 
                  {' '}Delete
                </Button>
              </div>
            </ListGroupItem>
          </ListGroup>
        )
      });
    }
  }
  render() {
    var description = this.state.selected ? (
      <ProgramDetails programId = {this.state.selected} />
    ) : (
      <h1>No Description</h1>
    );

    return(
      <div>
        {this.displayPrograms()}
        {description}
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