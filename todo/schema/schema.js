const graphql = require('graphql');
const TodoProgram = require('../todo_src/TodoProgram');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;


const ProgramType = new GraphQLObjectType({
  name: 'Program',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    program: {
      type: ProgramType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return TodoProgram.WorkProgramById(args.id)
      }
    },
    programs: {
      type: new GraphQLList(ProgramType),
      resolve(parent, args) {
        // return list of programs;
        return TodoProgram.WorkPrograms();
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
        return TodoProgram.WorkProgram(program_args)
      }
    },
    delProgram: {
      type: ProgramType,
      args: {
        id: {type: GraphQLID}
      },
      resolve(parent, args) {
        return TodoProgram.WorkProgramDeleteById(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});