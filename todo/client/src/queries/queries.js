import { gql } from 'apollo-boost';

const getProgramsQuery = gql `
query {
  programs {
    name
    id
  }
}`;

const getProgramQuery = gql`
  query($id: ID!) {
    program(id: $id) {
      id
      name
      description
    }
  }
`;

const addProgramMutation = gql`
  mutation($name: String!, $description: String!) { 
    addProgram(name: $name, description: $description) {
      id
      name
    description
  }
}
`;

const delProgramMutation = gql`
  mutation($id: ID!) { 
    delProgram(id: $id) {
      id
      name
    description
  }
}
`;
      
export {getProgramsQuery, getProgramQuery, addProgramMutation, delProgramMutation}