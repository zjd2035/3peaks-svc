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

  type Budget {
    id: ID
    budget: Float!
    currentSpent: Float
    budgetCycle: Int!
    budgetCycleUnit: CycleUnit!
    startDate: Date!
    user: User!
    category: Category
  }

  ######################################################
  # Queries
  ######################################################

  extend type Query {
    budget(id: ID!): Budget!
  }

  ######################################################
  # Mutation Inputs
  ######################################################


  input CreateBudgetInput {
    budget: Float!
    budgetCycle: Int!
    budgetCycleUnit: CycleUnit!
    startDate: Date!
    categoryId: ID
    userId: ID!
  }

  input UpdateBudgetInput {
    id: ID!
    budget: Float
    budgetCycle: Int
    budgetCycleUnit: CycleUnit
    startDate: Date
    userId: ID!
  }

  ######################################################
  # Mutation Payloads
  ######################################################

  type CreateBudgetPayload {
    budget: Budget!
  }

  type UpdateBudgetPayload {
    budget: Budget!
  }

  ######################################################
  # Mutations
  ######################################################

  extend type Mutation {
    updateBudget(input: UpdateBudgetInput!): UpdateBudgetPayload!
    createBudget(input: CreateBudgetInput!): CreateBudgetPayload!
  }
`;
