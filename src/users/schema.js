import { gql } from 'apollo-server-express';

export default gql`
  ######################################################
  # Custom Types
  ######################################################
  type Token {
    value: String!
  }

  type User {
    id: ID
    email: String
    name: String!
    budget: [Budget!]
    isPremium: Boolean
    premiumDate: Date
    transactions: [Transaction!]
    categories: [Category!]
  }

  ######################################################
  # Queries
  ######################################################

  extend type Query {
    currentUser: User
  }

  ######################################################
  # Mutation Inputs
  ######################################################

  input SignUpInput {
    email: String!
    password: String!
    recaptchaToken: String!
  }

  input LoginInput {
    email: String!
    password: String!
    recaptchaToken: String!
  }

  ######################################################
  # Mutation Payloads
  ######################################################

  type SignUpPayload {
    token: Token
  }

  type LoginPayload {
    token: Token
  }

  ######################################################
  # Mutations
  ######################################################

  extend type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!

    login(input: LoginInput!): LoginPayload!
  }
`;
