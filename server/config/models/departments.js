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
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
