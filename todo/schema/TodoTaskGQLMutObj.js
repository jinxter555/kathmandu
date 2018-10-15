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

const TodoTaskGQLMutObj = {
  name: 'Mutation',
  fields: {
    addTaskByProcessId: {
      type: TaskType,
      args: {
        id: {type: GraphQLID},
        description: {type: GraphQLString}
      },
      resolve(parent, args) {
        task_args = {
          description: args.description
        }
        return TodoTask.createOrUpdateByProcessId(args.id, task_args)
      }
    },
    delTask: {
      type: TaskType,
      args: {
        id: {type: GraphQLID}
      },
      resolve(parent, args) {
        return TodoTask.deleteById(args.id);
      }
    }
  }
}

module.exports = { TodoTaskGQLMutObj }
