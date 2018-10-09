const graphql = require('graphql');
const TodoProgram = require('../todo_src/TodoProgram');
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

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
  })
});

const ProgramType = new GraphQLObjectType({
  name: 'Program',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    projects: {
      type: GraphQLList(ProgramType),
      resolve(parent, args) {
        return TodoProject.findByProgramId(parent._id);
      }
    },
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    program: {
      type: ProgramType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        console.log("program loading")
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
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
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
        console.log("in addProjectBy.. resolver--");
        program_args = {
          name: args.name,
          description: args.description
        }
        return TodoProject.createOrUpdateByProgramId(args.id, program_args)
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});