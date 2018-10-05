const {makeExecutableSchema, mockSchema, mockServer, addMockFunctionsToSchema } = require('graphql-tools');
const {graphql} = require('graphql');

const testCaseA = {
  id: 'Test case A',
  query: `
    query {
      animals {
         origin
      }
    }
  `,
  variables: { },
  context: { },
  expected: { data: { animals: [{ origin: 'Dog' }, {origin: 'Dog'}] } }
};

const typeDefs = `
  type Animal {
    id: Int
		origin: String
  },
	type Query {
    animals(id: Int): [Animal]
  },
  # this schema allows the following mutation:
  type Mutation {
    animal(id: Int): Animal
  }
`;

describe('Schema', () => {
  // Array of case types
  const cases = [testCaseA];

  const mockSchema = makeExecutableSchema({ typeDefs });

  // Here we specify the return payloads of mocked types
  addMockFunctionsToSchema({
    schema: mockSchema,
    mocks: {
      Boolean: () => false,
      ID: () => '1',
      Int: () => 1,
      Float: () => 12.34,
      String: () => 'Dog',
    }
  });

  test('has valid type definitions', async () => {
    expect(async () => {
      const MockServer = mockServer(typeDefs);

      await MockServer.query(`{ __schema { types { name } } }`);
    }).not.toThrow();
  });

  cases.forEach(obj => {
    const { id, query, variables, context: ctx, expected } = obj;

    test(`query: ${id}`, async () => {
      return await expect(
        graphql(mockSchema, query, null, { ctx }, variables)
      ).resolves.toEqual(expected);
    });
  });

});
