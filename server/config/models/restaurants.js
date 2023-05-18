import DataTypes from "sequelize";
import sequelize from "../database/db.js";

const Restaurant = sequelize.define('Restaurant', {
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
    street: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    kashrut: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    logo: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE'
    },
}, {
    tableName: 'restaurants',
    paranoid: true,
    updatedAt: "modified_at",
    deletedAt: "softDelete",
    createdAt: "created_at",
});

export default Restaurant;
