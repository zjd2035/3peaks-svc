import { dateResolver } from './scalars/date';

import userResolvers from './users/resolvers';
import statResolvers from './stats/resolvers';
import transactionResolvers from './transactions/resolvers';
import categoryResolvers from './categories/resolvers';

export default [
  dateResolver,
  userResolvers,
  statResolvers,
  transactionResolvers,
  categoryResolvers,
];
