import Sequelize from 'sequelize';

let sequelizeInstance;
if (process.env.DATABASE_URL) {
  sequelizeInstance = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
  });
} else {
  sequelizeInstance = new Sequelize(
    process.env.TEST_DATABASE || process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: 'postgres',
      logging: false,
    },
  );
}

// make sure the export is not mutable
const sequelize = sequelizeInstance;

const models = {
  User: sequelize.import('./users/models'),
  Stat: sequelize.import('./stats/models'),
  Transaction: sequelize.import('./transactions/models'),
  Category: sequelize.import('./categories/models'),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
