import uuidv4 from 'uuid/v4';
import Sequelize from 'sequelize';

const budget = (sequelize, DataTypes) => {
  const Budget = sequelize.define('budget', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: uuidv4(),
    },
    budget: {
      type: DataTypes.DECIMAL(15, 6),
      allowNull: true,
    },
    currentSpent: {
      type: DataTypes.DECIMAL(15, 6),
      allowNull: false,
    },
    budgetCycle: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    budgetCycleUnit: {
      type: DataTypes.ENUM('DAYS', 'WEEKS', 'MONTHS', 'YEARS'),
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    timestamps: true,
  });

  Budget.associate = (models) => {
    Budget.belongsTo(models.Category);
    Budget.belongsTo(models.User);
  };

  return Budget;
};

export default budget;
