import db from "../database/db.js";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt';
dotenv.config();

class UsersFunctions {
  constructor() { }

  static async save(newData) {

    newData.password = await bcrypt.hash(newData.password.toString(), 10);

    let sql = `INSERT INTO users (name, phone, email,password,role) VALUES (?,?,?,?,?)`;

    return await db.query(sql, [newData.name, newData.phone, newData.email, newData.password,"manager"]);
  }
  
}
export default UsersFunctions;