const {makeExecutableSchema, mockSchema, mockServer,
  addMockFunctionsToSchema} = require('graphql-tools');
const {graphql} = require('graphql');

const testCaseA = {
  id:  'Test case A',
  query: `
  query {
    animals {
      origin
    }
  }`,
  variables: {},
  context: {},
  expected: {data: {animals: [{origin: 'dog'}]}}
}

const typeDefs = `
type Animal {
  id: Int
  origin: String
},
type Query {
   animals: [Animal]
}`;

describe('Schema', () => {
  const cases = [testCaseA];
  const mockSchema =  makeExecutableSchema({typeDefs});

  addMockFunctionsToSchema({
    schema: mockSchema,
    mocks: {
      Boolean: () => false,
      ID: () => '1',
      Int: () => 12.34,
      String: () => 'dog',
    }
  });

  test('has valid type definitions', async () => {
    expect(async () => {
      const MockServer = mockServer(typeDefs);
      await MockServer.query(`{__schema {types {name}}}`);
    }).not.toThrow();
  });

  cases.forEach(obj => {
    const {id, query, variables, context: ctx, expected} = obj;
    test(`query: ${id}`, async () => {
      return await expect(
        graphql(mockSchema, query, null, { ctx }, variables)
      ).resolves.toEqual(expected);
    });
  });
});
