import { ForbiddenError } from 'apollo-server';

export default {
  Query: {
    budget: async (parent, { id }, { models, currentUser }) => {
      if (!currentUser) {
        return null;
      }

      const where = {
        id,
        userId: currentUser.id,
      };

      return models.Budget.findOne({ where });
    },
  },

  Mutation: {
    createBudget: async (parent, { input }, { models, currentUser }) => {
      if (!currentUser) {
        return null;
      }

      const create = { ...input };
      if (!input.categoryId) {
        delete create.categoryId;
      }

      return {
        budget: models.Budget.create(
          create, {
            include: [
              models.Category,
              models.User,
            ],
          },
        ),
      };
    },

    updateBudget: async (parent, { input }, { models, currentUser }) => {
      const {
        id,
        budget,
        budgetCycle,
        budgetCycleUnit,
        startDate,
        categoryId,
        userId,
      } = input;

      if (!currentUser) {
        return null;
      }

      if (currentUser.id !== userId) {
        throw new ForbiddenError('User not permitted to update this budget.');
      }

      if (!budget && !budgetCycle && !budgetCycleUnit && !startDate && !categoryId) {
        return null;
      }

      const update = { ...input };
      Object.keys(input).forEach((key) => {
        if (!input[key]) {
          delete update[key];
        }
      });

      const updatedBudget = models.Budget.findByPk(id).then((result) => {
        return result.update(update).then((self) => {
          return self.dataValues;
        });
      });

      return { budget: updatedBudget };
    },
  },
};
