import bcrypt from 'bcrypt';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
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
  };

  return User;
};

export default user;
