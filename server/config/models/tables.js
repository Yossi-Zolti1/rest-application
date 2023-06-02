import DataTypes from "sequelize";
import sequelize from "../database/db.js";

const Table = sequelize.define(
  'Table',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Name is required'
        }
      }
    },
    positionX: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      positionY: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'foreign key is required'
        }
      },
      references: {
        model: "restaurants",
        key: 'id'
      },
      onUpdate: 'CASCADE'
    },
  },
  {
    tableName: 'tables',
    updatedAt: "modified_at",
    createdAt: "created_at",
  }
);

export default Table;
