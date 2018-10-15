const schema = require('./schema');
const graphql = require('graphql');
const {TaskType, ProcessType, ProjectType, ProgramType} = require('../schema/type');
const TodoProgram = require('../todo_src/TodoProgram');
const TodoProject = require('../todo_src/TodoProject');
const TodoProcess = require('../todo_src/TodoProcess');
const TodoTask = require('../todo_src/TodoTask');

const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;


const RootQuery1_obj = {
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
      resolve(parent, args) {
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



const RootQuery2_obj = {
  name: 'RootQueryType',
  fields: {
    process: {
      name: "hello",
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
    programs: {
      type: new GraphQLList(ProgramType),
      resolve(parent, args) {
        return TodoProgram.findAll();
      }
    }
  }
};

var RootQueryObj = {};
RootQueryObj =  _.merge(RootQueryObj, RootQuery1_obj);
RootQueryObj =  _.merge(RootQueryObj, RootQuery2_obj);


console.dir(RootQueryObj);
const RootQuery = new GraphQLObjectType(RootQueryObj)

test("test123" , () => {
  return undefined;
});

