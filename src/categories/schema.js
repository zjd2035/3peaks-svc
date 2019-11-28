import { gql } from 'apollo-server-express';

export default gql`
  type Category {
    id: ID!
    name: String!
    userId: ID!
    user: User!
    transactions: [Transaction!]!
  }

  extend type Query {
    category(id: ID!): Category!
    categories: [Category!]!
  }

  extend type Mutation {
    createCategory(
      name: String!
    ): Category

    updateCategory(
      id: ID!
      name: String!
    ): Category

    deleteCategory(id: ID!): Boolean!
  }
`;
