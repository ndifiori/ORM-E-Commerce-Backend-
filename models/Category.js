const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

// create a new sequelize model for categories
  // TODO: define columns
    // primary key
    // category name

  // TODO: a primary key using ID
    // sequelize will create one for us but this is better practice

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
