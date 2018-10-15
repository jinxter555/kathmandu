const graphql = require('graphql');
const {ProcessType, ProjectType, ProgramType} = require('../schema/type');
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

const TodoProgramGQLMutObj = {
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
    }
  }
}

module.exports = { TodoProgramGQLMutObj }
