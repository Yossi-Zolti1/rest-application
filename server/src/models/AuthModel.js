import db from "../../config/database/db.js";
import dotenv from 'dotenv';
dotenv.config();

class AuthModel {
  constructor() { }

  // check if email exsit
  static async findByEmail(email) {
    let sql = `SELECT id,password,email,role FROM users WHERE email = ?`;
    return await db.execute(sql, [email]);
  }
  
}
export default AuthModel;