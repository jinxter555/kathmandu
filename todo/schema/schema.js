const graphql = require('graphql');
const TodoProgram = require('../todo_src/TodoProgram');
const TodoProject = require('../todo_src/TodoProject');
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

const ProcessType = new GraphQLObjectType({
  name: 'Process',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
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
        // return list of programs;
        return TodoProgram.findAll();
      }
    },
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
        console.log("hello del project")
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
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});