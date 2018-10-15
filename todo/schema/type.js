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

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: {type: GraphQLID},
    description: {type: GraphQLString},
  })
});

const ProcessType = new GraphQLObjectType({
  name: 'Process',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    tasks: {
      type: GraphQLList(TaskType),
      resolve(parent, args) {
        return TodoTask.findByProcessId(parent._id);
      }
    },
  })
});

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    processes: {
      type: GraphQLList(ProcessType),
      resolve(parent, args) {
        return TodoProcess.findByProjectId(parent._id);
      }
    },
  })
});

const ProgramType = new GraphQLObjectType({
  name: 'Program',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    projects: {
      type: GraphQLList(ProjectType),
      resolve(parent, args) {
        return TodoProject.findByProgramId(parent._id);
      }
    },
  })
});

module.exports = {
  TaskType, ProcessType, ProjectType, ProgramType
}