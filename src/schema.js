import { gql } from 'apollo-server-express';

import { dateSchema } from './scalars/date';

import userSchema from './users/schema';
import statSchema from './stats/schema';
import transactionSchema from './transactions/schema';
import categorySchema from './categories/schema';


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

export default [
  linkSchema,
  dateSchema,
  userSchema,
  statSchema,
  transactionSchema,
  categorySchema,
];
