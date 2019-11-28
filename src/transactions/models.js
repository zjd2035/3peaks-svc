const transaction = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transaction', {
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
