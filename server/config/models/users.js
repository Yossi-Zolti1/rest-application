import DataTypes from "sequelize";
import sequelize from "../database/db.js";

const User = sequelize.define('User', {
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
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
},
 {
     tableName: 'users',
    paranoid: true,
    updatedAt: "modified_at",
    deletedAt: "softDelete",
    createdAt: "created_at",
});

export default User;
