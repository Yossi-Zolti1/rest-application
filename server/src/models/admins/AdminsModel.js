import db from "../../../config/database/db.js";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

class AdminsModel {
  constructor() { }

  static async save(newData) {
    console.log(555555);

    try {
      newData.password = await bcrypt.hash(newData.password.toString(), 10);
    } catch (error) {
      throw new Error('Error hashing password');
    }
    let sql = `INSERT INTO users (name, phone, email,password,role) VALUES (?,?,?,?,?)`;
    try {
      console.log(666666);
      return await db.query(sql, [newData.name, newData.phone, newData.email, newData.password, 'owner']);
    } catch (error) {
      console.log(7777777);

      throw new Error(error);
    }
  }
  
}
export default AdminsModel;