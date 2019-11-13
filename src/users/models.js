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
  }, {
    timestamps: true,
  });

  User.findByEmail = async (email) => User.findOne({
    where: {
      email,
    },
  });

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

  return User;
};

export default user;
