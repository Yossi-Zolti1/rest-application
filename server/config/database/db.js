import dotenv from "dotenv";
import Sequelize from "sequelize";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  null,
  {
    dialect: "mysql",
    timezone: '+03:00', // Set your local timezone offset here
    host: process.env.HOST,
  });

export default sequelize;


