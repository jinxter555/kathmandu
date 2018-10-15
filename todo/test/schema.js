const graphql = require('graphql');
const TodoProgram = require('../todo_src/TodoProgram');
const TodoProject = require('../todo_src/TodoProject');
const TodoProcess = require('../todo_src/TodoProcess');
const TodoTask = require('../todo_src/TodoTask');
const {TaskType2} = require('./type');

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

//import {TaskType2} from './type';
//console.dir(TaskType);
//console.log(TaskType2);


const ProcessType = new GraphQLObjectType({
  name: 'Process',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    tasks: {
      type: GraphQLList(TaskType2),
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

const RootQuery = new GraphQLObjectType({
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
});

const Mutation =  new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProgram: {
      type: ProgramType,
      args: {
        name: {type: GraphQLString},
        description: {type: GraphQLString}
      },
      resolve(parent, args) {
        program_args = {
          name: args.name,
          description: args.description
        }
        return TodoProgram.createOrUpdate(program_args)
      }
    },
    delProgram: {
      type: ProgramType,
      args: {
        id: {type: GraphQLID}
      },
      resolve(parent, args) {
        return TodoProgram.deleteById(args.id);
      }
    },
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
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
