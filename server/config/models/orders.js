import DataTypes from "sequelize";
import sequelize from "../database/db.js";

const Order = sequelize.define('orders', {
    orderId: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    itemId: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    restId: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    tableId: {
        type: DataTypes.NUMBER,
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
