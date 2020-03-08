import express from 'express';
import jwt from 'jsonwebtoken';
import {
  ApolloServer,
  AuthenticationError,
} from 'apollo-server-express';
import cors from 'cors';
import 'dotenv/config';

import typeDefs from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';

const app = express();
const isTest = !!process.env.TEST_DATABASE;
const port = process.env.PORT || 8000;

app.use(cors());

const getCurrentUser = async (req) => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session has expired. Please sign in again.',
      );
    }
  } else {
    return undefined;
  }
};

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const currentUser = await getCurrentUser(req);

    return {
      models,
      currentUser,
      secret: process.env.SECRET,
    };
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const createUserWithBudget = async () => {
  const testUser = await models.User.create({
    name: 'Zack D',
    email: 'zdowns.3peaks@gmail.com',
    password: '12345678',
  });

  await models.Budget.create({
    budget: 0.00,
    currentSpent: 0.00,
    budgetCycle: 2,
    budgetCycleUnit: 'WEEKS',
    startDate: new Date(),
    userId: testUser.id,
  }, {
    include: [
      models.User,
    ],
  });
};

sequelize.sync({ force: isTest }).then(async () => {
  if (isTest) {
    createUserWithBudget();
  }

  app.listen({ port }, () => {
    console.log(`Apollo server available on http://localhost:${port}/graphql`);
  });
});
