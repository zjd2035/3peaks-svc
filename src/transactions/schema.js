import { gql } from 'apollo-server-express';

export default gql`
  ######################################################
  # Custom Types
  ######################################################

  type Transaction {
    id: ID!
    amount: Float!
    userId: ID!
    user: User!
    categoryId: ID!
    category: Category!
    createdAt: Date!
    updatedAt: Date!
  }

  ######################################################
  # Queries
  ######################################################

  extend type Query {
    transaction(id: ID!): Transaction!
    transactions: [Transaction!]!
  }

  ######################################################
  # Mutation Inputs
  ######################################################

  input CreateTransactionInput {
    categoryId: ID
    amount: Float!
  }

  input UpdateTransactionInput {
    id: ID!
    amount: Float
    categoryId: ID
  }

  input DeleteTransactionInput {
    id: ID!
  }

  ######################################################
  # Mutation Payloads
  ######################################################

  type CreateTransactionPayload {
    transaction: Transaction
  }

  type UpdateTransactionPayload {
    transaction: Transaction
  }

  type DeleteTransactionPayload {
    id: ID
  }

  ######################################################
  # Mutations
  ######################################################

  extend type Mutation {
    createTransaction(input: CreateTransactionInput!): CreateTransactionPayload!

    updateTransaction(input: UpdateTransactionInput!): UpdateTransactionPayload!

    deleteTransaction(input: DeleteTransactionInput!): DeleteTransactionPayload!
  }
`;
