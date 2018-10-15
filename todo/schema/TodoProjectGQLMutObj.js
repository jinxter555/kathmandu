const graphql = require('graphql');
const {ProcessType, ProjectType, ProgramType} = require('../schema/type');
//const TodoProgram = require('../todo_src/TodoProgram');
const TodoProject = require('../todo_src/TodoProject');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const TodoProjectGQLMutObj = {
  name: 'Mutation',
  fields: {
     addProjectByProgramId: {
      type: ProjectType,
      args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString}
      },
      resolve(parent, args) {
        project_args = {
          name: args.name,
          description: args.description
        }
        return TodoProject.createOrUpdateByProgramId(args.id, project_args)
      }
    },
    delProject: {
      type: ProjectType,
      args: {
        id: {type: GraphQLID}
      },
      resolve(parent, args) {
        return TodoProject.deleteById(args.id);
      }
    },
  }
}

module.exports = { TodoProjectGQLMutObj }
