const graphql = require('graphql');

const _ = require('lodash')


const {TodoGQLQueryObj} = require('./TodoGQLQueryObj');
const {TodoProgramGQLMutObj} = require('./TodoProgramGQLMutObj')
const {TodoProjectGQLMutObj} = require('./TodoProjectGQLMutObj')
const {TodoProcessGQLMutObj} = require('./TodoProcessGQLMutObj')
const {TodoTaskGQLMutObj} = require('./TodoTaskGQLMutObj')
const {TodoAppUserGQLMutObj} = require('./TodoAppUserGQLMutObj')

const {
  GraphQLObjectType,
  GraphQLSchema,
} = graphql;

var RootQueryObj = {};
_.merge(RootQueryObj, TodoGQLQueryObj);
const RootQuery = new GraphQLObjectType(RootQueryObj);

var MutationObj = {};
_.merge(MutationObj, TodoProgramGQLMutObj);
_.merge(MutationObj, TodoProjectGQLMutObj);
_.merge(MutationObj, TodoProcessGQLMutObj);
_.merge(MutationObj, TodoTaskGQLMutObj);
_.merge(MutationObj, TodoAppUserGQLMutObj);
const Mutation =  new GraphQLObjectType(MutationObj);

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});