import uuidv4 from 'uuid/v4';
import Sequelize from 'sequelize';

const category = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: uuidv4(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  Category.associate = (models) => {
    Category.belongsTo(models.User);
    Category.hasMany(models.Transaction);
    Category.hasOne(models.Budget, { onDelete: 'CASCADE' });
  };

  return Category;
};

export default category;
