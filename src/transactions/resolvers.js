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

      return models.Transaction.create({
        amount,
        userId: currentUser.id,
        categoryId,
      }, {
        include: [
          models.Category,
          models.User,
        ],
      });
    },

    updateTransaction: async (parent, { input }, { models, currentUser }) => {
      const { id, amount, categoryId } = input;

      if (!currentUser) {
        return null;
      }

      if (!categoryId && !amount) {
        return null;
      }

      const update = {};
      if (categoryId) {
        update.categoryId = categoryId;
      }
      if (amount) {
        update.amount = amount;
      }

      return models.Transaction.findByPk(id).then((transaction) => {
        return transaction.update(update).then((self) => {
          return self.dataValues;
        });
      });
    },

    deleteTransaction: async (parent, { input }, { models, currentUser }) => {
      if (!currentUser) {
        return null;
      }

      const where = { id: input.id };

      return models.Transaction.destroy({ where });
    },
  },
};
