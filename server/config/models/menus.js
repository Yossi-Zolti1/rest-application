import DataTypes from "sequelize";
import sequelize from "../database/db.js";

const Menu = sequelize.define(
  'Menu',
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
      validate: {
        notEmpty: {
          msg: 'Name is required'
        }
      }
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
    tableName: 'menus',
    updatedAt: "modified_at",
    createdAt: "created_at",
  }
);

export default Menu;
