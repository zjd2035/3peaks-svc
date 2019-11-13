import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    currentUser: User
  }

  extend type Mutation {
    signUp(
      email: String!
      password: String!
      recaptchaToken: String!
    ): Token!

    signIn(
      email: String!
      password: String!
      recaptchaToken: String!
    ): Token!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    email: String!
  }
`;
