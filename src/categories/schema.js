import { gql } from 'apollo-server-express';

export default gql`
  ######################################################
  # Custom Types
  ######################################################

  type Category {
    id: ID!
    name: String!
    user: User!
    transactions: [Transaction!]!
    createdAt: Date!
    updatedAt: Date!
  }

  ######################################################
  # Queries
  ######################################################

  extend type Query {
    category(id: ID!): Category!
    categories: [Category!]!
  }

  ######################################################
  # Mutation Inputs
  ######################################################

  input CreateCategoryInput {
    name: String!
  }

  input UpdateCategoryInput {
    id: ID!
    name: String!
  }

  input DeleteCategoryInput {
    id: ID!
  }

  ######################################################
  # Mutation Payloads
  ######################################################

  type CreateCategoryPayload {
    category: Category
  }

  type UpdateCategoryPayload {
    category: Category
  }

  type DeleteCategoryPayload {
    id: ID
  }

  ######################################################
  # Mutations
  ######################################################

  extend type Mutation {
    createCategory(input: CreateCategoryInput!): CreateCategoryPayload!

    updateCategory(input: UpdateCategoryInput!): UpdateCategoryPayload!

    deleteCategory(input: DeleteCategoryInput!): DeleteCategoryPayload!
  }
`;
