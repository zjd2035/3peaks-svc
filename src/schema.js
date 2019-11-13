import { gql } from 'apollo-server-express';

import userSchema from './users/schema';
import statSchema from './stats/schema';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, statSchema];