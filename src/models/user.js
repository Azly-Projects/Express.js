const { Model } = require('sequelize');

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }

  User.init(
    {
      email: DataTypes.STRING,
      mobile: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      nickname: DataTypes.STRING,
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo_profile: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM('active', 'suspended', 'banned'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
    },
  );

  return User;
};
