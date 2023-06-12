import DataTypes from "sequelize";
import sequelize from "../database/db.js";

const Order = sequelize.define('orders', {
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    restId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tableId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
    {
        tableName: 'orders',
        updatedAt: "modified_at",
        createdAt: "created_at",
    }
);

export default Order;
