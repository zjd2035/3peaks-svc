import bcrypt from 'bcrypt';
import uuidv4 from 'uuid/v4';
import Sequelize from 'sequelize';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: uuidv4(),
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Your email is already taken!',
        fields: [sequelize.fn('lower', sequelize.col('email'))],
      },
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8, 42],
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    premiumDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    timestamps: true,
  });

  User.findByEmail = async (email) => {
    return User.findOne({
      where: {
        email,
      },
    });
  };

  User.beforeCreate(async (newUser) => {
    // eslint-disable-next-line no-param-reassign
    newUser.password = await newUser.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = async function generatePasswordHash() {
    const saltRounds = 10;
    return bcrypt.hash(this.password, saltRounds);
  };

  User.prototype.validatePassword = async function validatePassword(password) {
    return bcrypt.compare(password, this.password);
  };

  User.associate = (models) => {
    User.hasMany(models.Category, { onDelete: 'CASCADE' });
    User.hasMany(models.Transaction, { onDelete: 'CASCADE' });
    User.hasMany(models.Budget, { onDelete: 'CASCADE' });
  };

  return User;
};

export default user;
