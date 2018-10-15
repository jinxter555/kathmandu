const graphql = require('graphql');
const {ProcessType, ProjectType, ProgramType} = require('../schema/type');
const TodoProcess = require('../todo_src/TodoProcess');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const TodoProcessGQLMutObj = {
  name: 'Mutation',
  fields: {
    addProcessByProjectId: {
      type: ProcessType,
      args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString}
      },
      resolve(parent, args) {
        process_args = {
          name: args.name,
          description: args.description
        }
        return TodoProcess.createOrUpdateByProjectId(args.id, process_args)
      }
    },
    delProcess: {
      type: ProcessType,
      args: {
        id: {type: GraphQLID}
      },
      resolve(parent, args) {
        return TodoProcess.deleteById(args.id);
      }
    },
  }
}

module.exports = { TodoProcessGQLMutObj }
