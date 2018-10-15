const graphql = require('graphql');
const TodoProgram = require('../todo_src/TodoProgram');
const TodoProject = require('../todo_src/TodoProject');
const TodoProcess = require('../todo_src/TodoProcess');
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

export default TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: {type: GraphQLID},
    description: {type: GraphQLString},
  })
});
