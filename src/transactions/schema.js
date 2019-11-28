import { gql } from 'apollo-server-express';

export default gql`
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

  extend type Query {
    transaction(id: ID!): Transaction!
    transactions: [Transaction!]!
  }

  extend type Mutation {
    createTransaction(
      amount: Float!
      categoryId: ID
    ): Transaction

    updateTransaction(
      id: ID!
      amount: Float
      categoryId: ID
    ): Transaction

    deleteTransaction(id: ID!): Boolean!
  }
`;
