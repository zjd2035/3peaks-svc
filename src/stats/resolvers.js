export default {
  Query: {
    stats: async (parent, args, { models }) => {
      return models.Stat.findAll();
    },
    stat: async (parent, { type, group, segment }, { models }) => {
      const where = {
        type,
        group,
        segment,
      };

      if (!group) delete where.group;
      if (!segment) delete where.segment;

      return models.Stat.findOne({
        where,
      });
    },
  },

  Mutation: {
    incrementStat: async (parent, { type, group, segment }, { models }) => {
      try {
        const where = {
          type,
          group,
          segment,
        };

        if (!group) delete where.group;
        if (!segment) delete where.segment;

        const stat = await models.Stat.findOne({
          where,
        });

        if (stat) {
          stat.update({
            count: stat.count + 1,
          });
        } else {
          return await models.Stat.create({
            ...where,
            count: 1,
          });
        }

        return stat;
      } catch (error) {
        throw new Error(error);
      }
    },
    decrementStat: async (parent, { type, group, segment }, { models }) => {
      try {
        const where = {
          type,
          group,
          segment,
        };

        if (!group) delete where.group;
        if (!segment) delete where.segment;

        const stat = await models.Stat.findOne({
          where,
        });

        if (stat) {
          stat.update({
            count: stat.count - 1,
          });
        }

        return stat;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
