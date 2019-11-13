import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { currentUser }) => {
  if (currentUser) {
    return skip;
  }

  return new ForbiddenError('User is not authenticated');
};
