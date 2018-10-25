const graphql = require('graphql');
//const {TaskType, ProcessType, ProjectType, ProgramType} = require('../schema/type');
const TodoAppUser = require('../todo_src/TodoAppUser');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const TodoAppUserGQLMutObj = {
  name: 'Mutation',
  fields: {
    login: {
      type: GraphQLString,
      args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString}
      },
      async resolve(parent, {email, password}) {
        token = await TodoAppUser.login(email, password)
        console.log(token)
        return token;
      }
    },
  }
}

module.exports = { TodoAppUserGQLMutObj }
