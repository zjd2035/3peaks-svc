import { gql } from 'apollo-server-express';

export default gql`

  extend type Query {
    stats: [Stat!]
    stat(type: String!, group: String, segment: String): Stat
  }

  extend type Mutation {
    incrementStat(type: String!, group: String, segment: String): Stat!
    decrementStat(type: String!, group: String, segment: String): Stat!
  }

  type Stat {
    id: ID!
    type: String!
    group: String
    segment: String
    count: Int!
  }
`;