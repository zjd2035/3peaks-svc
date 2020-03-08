import { ForbiddenError } from 'apollo-server';

export default {
  Transaction: {
    category: (transaction, args, { models }) => {
      return models.Category.findByPk(transaction.categoryId);
    },
    user: async (transaction, args, { models }) => {
      return models.User.findByPk(transaction.userId);
    },
  },

  Query: {
    transaction: async (parent, { id }, { models, currentUser }) => {
      if (!currentUser) {
        return null;
      }

      const where = {
        id,
        userId: currentUser.id,
      };

      return models.Transaction.findOne({ where });
    },

    transactions: async (parent, args, { models, currentUser }) => {
      if (!currentUser) {
        return null;
      }

      const where = { userId: currentUser.id };

      return models.Transaction.findAll({ where });
    },
  },

  Mutation: {
    createTransaction: async (parent, { input }, { models, currentUser }) => {
      const { amount, categoryId } = input;

      if (!currentUser) {
        return null;
      }

      return {
        transaction: models.Transaction.create({
          amount,
          userId: currentUser.id,
          categoryId,
        }, {
          include: [
            models.Category,
            models.User,
          ],
        }),
      };
    },

    updateTransaction: async (parent, { input }, { models, currentUser }) => {
      const {
        id,
        amount,
        categoryId,
        userId,
      } = input;

      if (!currentUser) {
        return null;
      }

      if (currentUser.id !== userId) {
        throw new ForbiddenError('User not permitted to update this transaction.');
      }

      if (!categoryId && !amount) {
        return null;
      }

      const update = { ...input };
      delete update.id;
      if (!categoryId) {
        delete update.categoryId;
      }
      if (!amount) {
        delete update.amount;
      }

      const transaction = models.Transaction.findByPk(id).then((result) => {
        return result.update(update).then((self) => {
          return self.dataValues;
        });
      });

      return { transaction };
    },

    deleteTransaction: async (parent, { input }, { models, currentUser }) => {
      const { id, userId } = input;

      if (!currentUser) {
        return null;
      }

      if (currentUser.id !== userId) {
        throw new ForbiddenError('User not permitted to delete this transaction.');
      }

      const where = { id };

      const deletedId = models.Transaction.findOne({ where }).then((result) => {
        return models.Transaction.destroy({ where }).then(() => {
          return result.id;
        });
      });

      return { deletedId };
    },
  },
};
