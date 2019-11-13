import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server';
import axios from 'axios';

const createToken = async (user, secret, expiresIn) => {
  const { id, email } = user;
  return jwt.sign({ id, email }, secret, { expiresIn });
};

const isHuman = async (token) => axios.post('https://www.google.com/recaptcha/api/siteverify', {
  response: token,
  secret: process.env.RECAPTCHA_SECRET_KEY,
}).then((response) => response.success);

export default {
  Query: {
    users: async (parent, args, { models }) => models.User.findAll(),
    currentUser: async (parent, args, { models, currentUser }) => {
      if (!currentUser) {
        return null;
      }

      return models.User.findByPk(currentUser.id);
    },
  },

  Mutation: {
    signUp: async (
      parent,
      { email, password, recaptchaToken },
      { models, secret },
    ) => {
      if (!isHuman(recaptchaToken)) {
        throw new AuthenticationError('reCaptcha failed');
      }

      const user = await models.User.create({
        email,
        password,
      });

      return { token: createToken(user, secret, '30m') };
    },

    signIn: async (
      parent,
      { email, password, recaptchaToken },
      { models, secret },
    ) => {
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

      return { token: createToken(user, secret, '30m') };
    },
  },
};
