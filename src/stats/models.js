const stat = (sequelize, DataTypes) => {
  const Stat = sequelize.define('stat', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    group: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    segment: {
      type: DataTypes.CHAR(1),
      allowNull: true,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  return Stat;
};

export default stat;
