export default {
  Category: {
    transactions: (category, args, { models }) => {
      const where = {
        transactionId: category.transactionId,
      };

      return models.Transaction.findAll({ where });
    },
    user: async (category, args, { models }) => {
      return models.User.findByPk(category.userId);
    },
  },

  Query: {
    category: async (parent, { id }, { models, currentUser }) => {
      if (!currentUser) {
        return null;
      }

      const where = {
        id,
        userId: currentUser.id,
      };

      return models.Category.findOne({ where });
    },

    categories: async (parent, args, { models, currentUser }) => {
      if (!currentUser) {
        return null;
      }

      const where = { userId: currentUser.id };

      return models.Category.findAll({ where });
    },
  },

  Mutation: {
    createCategory: async (parent, { name }, { models, currentUser }) => {
      if (!currentUser) {
        return null;
      }

      return models.Category.create({
        name,
        userId: currentUser.id,
      }, {
        include: [
          models.User,
        ],
      });
    },

    updateCategory: async (parent, { id, name }, { models, currentUser }) => {
      if (!currentUser) {
        return null;
      }

      return models.Category.findByPk(id).then((category) => {
        return category.update({ name }).then((self) => {
          return self.dataValues;
        });
      });
    },

    deleteCategory: async (parent, { id }, { models, currentUser }) => {
      if (!currentUser) {
        return null;
      }

      const where = { id };

      return models.Category.destroy({ where });
    },
  },
};
