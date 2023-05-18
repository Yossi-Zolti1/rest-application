import DataTypes from "sequelize";
import sequelize from "../database/db.js";
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
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
            len: {
              args: [3, 100],
              msg: 'Name should be between 3 and 100 characters'
            },
            is: {
              args: /^[a-zA-Z]+$/,
              msg: 'Name should contain only alphabetic characters'
            }
          }
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
              msg: 'Invalid email format'
            }
          }
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            len: {
              args: [9, 15],
              msg: 'Phone number should be between 9 and 15 characters'
            },
            isNumeric: {
              msg: 'Phone number should contain only numeric characters'
            }
          }
    },
    password: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          len: {
            args: [9, 200],
            msg: 'Password should be at least 9 characters'
          },
          validatePassword(value) {
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
              throw new Error('Password should contain at least one uppercase letter, one lowercase letter, and one number');
            }
          }
        }
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

User.beforeCreate(async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
});

export default User;
