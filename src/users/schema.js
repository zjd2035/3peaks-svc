import { gql } from 'apollo-server-express';

export default gql`
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

  extend type Query {
    currentUser: User
  }

  extend type Mutation {
    register(
      email: String!
      password: String!
      recaptchaToken: String!
    ): Token!

    login(
      email: String!
      password: String!
      recaptchaToken: String!
    ): Token!

    setBudget(
      budget: Float!
      budgetCycle: Int!
      budgetCycleUnit: CycleUnit!
    ): Boolean
  }
`;
