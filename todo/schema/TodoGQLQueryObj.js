const graphql = require('graphql');
const {ProcessType, ProjectType, ProgramType} = require('../schema/type');
const TodoProgram = require('../todo_src/TodoProgram');
const TodoProject = require('../todo_src/TodoProject');
const TodoProcess = require('../todo_src/TodoProcess');
//const TodoTask = require('../todo_src/TodoTask');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const TodoGQLQueryObj = {
  name: 'RootQueryType',
  fields: {
    process: {
      type: ProcessType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return TodoProcess.findById(args.id)
      }
    },
    project: {
      type: ProjectType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return TodoProject.findById(args.id)
      }
    },
    program: {
      type: ProgramType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args, context) {
        console.log(context.user)
        console.dir(context)
        return TodoProgram.findById(args.id)
      }
    },
    programs: {
      type: new GraphQLList(ProgramType),
      resolve(parent, args) {
        return TodoProgram.findAll();
      }
    }
  }
};

module.exports = { TodoGQLQueryObj }
