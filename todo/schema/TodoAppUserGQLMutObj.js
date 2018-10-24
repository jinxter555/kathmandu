const graphql = require('graphql');
const {TaskType, ProcessType, ProjectType, ProgramType} = require('../schema/type');
const TodoTask = require('../todo_src/TodoTask');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const TodoAppUserGQLMutObj = {
  name: 'Mutation',
  fields: {
    login: {
      type: GraphQLString,
      args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString}
      },
      resolve(parent, args) {
        return TodoTask.createOrUpdateByProcessId(args.id, task_args)
      }
    },
  }
}

module.exports = { TodoAppUserGQLMutObj }
