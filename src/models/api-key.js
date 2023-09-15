const { Model } = require('sequelize');

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  class APIKey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }

  APIKey.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'APIKey',
      tableName: 'API-keys',
    },
  );

  return APIKey;
};
