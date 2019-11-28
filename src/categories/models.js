const category = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
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
  };

  return Category;
};

export default category;
