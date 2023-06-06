import DataTypes from "sequelize";
import sequelize from "../database/db.js";

const Department = sequelize.define(
  'Department',
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
    image: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'foreign key is required'
        }
      },
      references: {
        model: "menus",
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
  },
  {
    tableName: 'departments',
    updatedAt: "modified_at",
    createdAt: "created_at",
  }
);



export default Department;
