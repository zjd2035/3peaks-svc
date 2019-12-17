import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server';
import axios from 'axios';
import 'dotenv/config';

const createToken = async (user, secret, expiresIn) => {
  const { id, email } = user;
  return jwt.sign({ id, email }, secret, { expiresIn });
};

const isHuman = async (token) => {
  if (process.env.TEST_DATABASE) {
    return true;
  }

  return axios.post('https://www.google.com/recaptcha/api/siteverify', {
    response: token,
    secret: process.env.RECAPTCHA_SECRET_KEY,
  }).then((response) => {
    return response.success;
  });
};

export default {
  Query: {
    currentUser: async (parent, args, { models, currentUser }) => {
      if (!currentUser) {
        return null;
      }

      return models.User.findByPk(currentUser.id);
    },
  },

  Mutation: {
    signUp: async (parent, { input }, { models, secret }) => {
      const { email, password, recaptchaToken } = input;

      if (!isHuman(recaptchaToken)) {
        throw new AuthenticationError('reCaptcha failed');
      }

      const user = await models.User.create({
        email,
        password,
        currentSpent: 0,
      });

      return { token: { value: createToken(user, secret, '30m') } };
    },

    login: async (parent, { input }, { models, secret }) => {
      const { email, password, recaptchaToken } = input;

      if (!isHuman(recaptchaToken)) {
        throw new AuthenticationError('reCaptcha failed');
      }

      const user = await models.User.findByEmail(email);

      if (!user) {
        throw new UserInputError(
          'No account was found with that email.',
        );
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError(
          'Invalid password.',
        );
      }

      return { token: { value: createToken(user, secret, '30m') } };
    },

    setBudget: async (parent, { input }, { models, currentUser }) => {
      if (!currentUser) {
        return { user: null };
      }

      const user = models.User.findByEmail(currentUser.email).then((result) => {
        return result.update(input).then((self) => {
          return self.dataValues;
        });
      });

      return { user };
    },
  },
};
