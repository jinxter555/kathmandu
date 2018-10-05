import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getProgramQuery} from '../queries/queries';
// import { Button } from 'reactstrap';

class ProgramDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }
  displayPrograms() {
    let data = this.props.data;
    if(data.loading){
      return(<div>Loading this Program</div>)
    } else {
      if(data.program == null) {return (<div>Nothing</div>)}
      return (
        <h1>{data.program.name} {data.program.description}</h1>
      );
    }
  }
  render() {
    return(
      <div>
        {this.displayPrograms()}
      </div>
    );
  }
}
export default graphql(getProgramQuery, {
  options: (props) => {
    return { variables: {id: props.programId}}
  }
})(ProgramDetails);
