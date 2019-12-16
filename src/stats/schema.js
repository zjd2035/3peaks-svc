import { gql } from 'apollo-server-express';

export default gql`
  ######################################################
  # Custom Types
  ######################################################

  type Stat {
    id: ID!
    type: String!
    group: String
    segment: String
    count: Int!
  }

  ######################################################
  # Queries
  ######################################################

  extend type Query {
    stats: [Stat!]
    stat(type: String!, group: String, segment: String): Stat
  }

  ######################################################
  # Mutation Inputs
  ######################################################

  input IncrementStatInput {
    type: String!
    group: String
    segment: String
  }

  input DecrementStatInput {
    type: String!
    group: String
    segment: String
  }

  ######################################################
  # Mutation Payloads
  ######################################################

  type IncrementStatPayload {
    stat: Stat
  }

  type DecrementStatPayload {
    stat: Stat
  }

  ######################################################
  # Mutations
  ######################################################

  extend type Mutation {
    incrementStat(input: IncrementStatInput!): IncrementStatPayload!
    decrementStat(input: DecrementStatInput!): DecrementStatPayload!
  }
`;
