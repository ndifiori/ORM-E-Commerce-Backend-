const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

// create a new sequelize model (aka table) for tag
  // TODO: define columns
    // a primary key
    // tag name


class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
