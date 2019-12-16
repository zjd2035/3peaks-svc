import { gql } from 'apollo-server-express';

export default gql`
  ######################################################
  # Custom Types
  ######################################################

  enum CycleUnit {
    DAYS
    WEEKS
    MONTHS
    YEARS
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    email: String!
    budget: Float
    currentSpent: Int!
    budgetCycle: Int
    budgetCycleUnit: CycleUnit
    transactions: [Transaction!]!
    categories: [Category!]!
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

  input SetBudgetInput {
    budget: Float!
    budgetCycle: Int!
    budgetCycleUnit: CycleUnit!
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

  type SetBudgetPayload {
    user: User
  }

  ######################################################
  # Mutations
  ######################################################

  extend type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!

    login(input: LoginInput!): LoginPayload!

    setBudget(input: SetBudgetInput!): SetBudgetPayload!
  }
`;
