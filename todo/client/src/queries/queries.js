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
      projects {
        id
        name
        description
      }
    }
  }`;

const getProjectQuery = gql`
  query($id: ID!) {
    project(id: $id) {
      id
      name
      description
      processes {
        id
        name
        description
      }
    }
  }`;

const addProgramMutation = gql`
  mutation($name: String!, $description: String!) { 
    addProgram(name: $name, description: $description) {
      id
      name
    description
  }
}`;

const delProgramMutation = gql`
  mutation($id: ID!) { 
    delProgram(id: $id) {
      id
      name
    description
  }
}`;

const delProjectMutation = gql`
  mutation($id: ID!) { 
    delProject(id: $id) {
      id
      name
    description
  }
}`;

const addProjectByProgramIdMutation = gql`
  mutation($id: ID!, $name: String!, $description: String!) { 
    addProjectByProgramId(id: $id, name: $name, description: $description) {
      id
      name
      description
  }
}`;
      
export {getProgramsQuery, getProgramQuery, getProjectQuery, addProgramMutation, delProgramMutation, delProjectMutation, addProjectByProgramIdMutation}