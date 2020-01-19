import { mockServer } from 'graphql-tools';
import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type User {
    id: ID
    email: String
    password: String
  }
  type Query {
    _dummy: String
  }
  type Mutation {
    createUser(email: String!, password: String!): User
  }
`);

const myMockServer = mockServer(schema);
function registerUserMock(email, password) {
  return myMockServer
    .query(
      `mutation {
        createUser (
          email: "${email}",
          password: "${password}"
        ) {
          id, 
          email
        }
      }`,
    );
}

export default registerUserMock;
