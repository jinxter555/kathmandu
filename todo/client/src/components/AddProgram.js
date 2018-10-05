import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addProgramMutation, getProgramsQuery } from '../queries/queries';
import { Button } from 'reactstrap';

class AddProgram extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: null,
      description: null
    }
  }
  submitForm(e){
    e.preventDefault();
    this.props.addProgramMutation({
      variables: {
        name: this.state.name,
        description: this.state.description
      },
      refetchQueries: [{ query: getProgramsQuery}]

    })
    document.getElementById("add-program").reset();
  }
  render() {
    return(
      <form id="add-program" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Program Name:</label>
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
export default compose(
  graphql(addProgramMutation, {name: "addProgramMutation"}),
  graphql(getProgramsQuery, {name: "getProgramsQuery"})
)(AddProgram);