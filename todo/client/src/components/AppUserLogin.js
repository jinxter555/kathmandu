import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { loginMutation } from '../queries/queries';
import { Button } from 'reactstrap';

class AppUserLogin extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: null,
      password: null
    }
  }
  submitForm(e){
    e.preventDefault();
    this.props.loginMutation({
      variables: {
        email: this.state.email,
        password: this.state.password
      },
      // refetchQueries: [{ query: getProgramsQuery}]

    }).then(res => {
      let token = res.data.login;
      localStorage.setItem('token', JSON.stringify(token));
      console.log(token)
    }).catch(e => { console.error(e)});
  }
  render() {
    return(
      <form id="appuser-login" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Email:</label>
          <input type="text" onChange={ (e) =>
            this.setState({email: e.target.value})
          }/>
        </div>

        <div className="field">
          <label>Password:</label>
          <input type="text" onChange={ (e) =>
            this.setState( {password: e.target.value} )
          }/>
        </div>
        <Button>Login</Button>
      </form>
    )
  }
}
export default compose(
  graphql(loginMutation, {name: "loginMutation"}),
)(AppUserLogin);
