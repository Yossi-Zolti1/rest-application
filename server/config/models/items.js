import DataTypes from "sequelize";
import sequelize from "../database/db.js";

const Item = sequelize.define(
  'Item',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    price: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    comment: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "departments",
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
  },
  {
    tableName: 'items',
    updatedAt: "modified_at",
    createdAt: "created_at",
  }
);

export default Item;
