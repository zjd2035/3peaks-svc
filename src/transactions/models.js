import uuidv4 from 'uuid/v4';
import Sequelize from 'sequelize';

const transaction = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transaction', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: uuidv4(),
    },
    amount: {
      type: DataTypes.DECIMAL(15, 6),
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Category);
    Transaction.belongsTo(models.User);
  };

  return Transaction;
};

export default transaction;
