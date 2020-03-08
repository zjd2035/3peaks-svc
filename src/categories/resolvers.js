import { ForbiddenError } from 'apollo-server';

export default {
  Category: {
    transactions: (category, args, { models }) => {
      const where = {
        categoryId: category.id,
      };

      return models.Transaction.findAll({ where });
    },
    user: async (category, args, { models }) => {
      return models.User.findByPk(category.userId);
    },
    budget: async (category, args, { models }) => {
      return models.Budget.findByPk(category.budgetId);
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
    createCategory: async (parent, { input }, { models, currentUser }) => {
      if (!currentUser) {
        return { category: null };
      }

      const category = models.Category.create({
        name: input.name,
        userId: currentUser.id,
      }, {
        include: [
          models.User,
        ],
      });

      return { category };
    },

    updateCategory: async (parent, { input }, { models, currentUser }) => {
      const { id, name, userId } = input;

      if (!currentUser) {
        return null;
      }

      if (currentUser.id !== userId) {
        throw new ForbiddenError('User not permitted to update this category.');
      }

      const category = models.Category.findByPk(id).then((result) => {
        return result.update({ name }).then((self) => {
          return self.dataValues;
        });
      });

      return { category };
    },

    deleteCategory: async (parent, { input }, { models, currentUser }) => {
      const { id, userId } = input;

      if (!currentUser) {
        return null;
      }

      if (currentUser.id !== userId) {
        throw new ForbiddenError('User not permitted to delete this category.');
      }

      const where = { id };

      const deletedId = models.Category.findOne({ where }).then((result) => {
        return models.Category.destroy({ where }).then(() => {
          return result.id;
        });
      });

      return { id: deletedId };
    },
  },
};
