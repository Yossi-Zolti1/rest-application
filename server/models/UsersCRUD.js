import db from "../database/db.js";
import bcrypt from 'bcrypt';

class UsersCRUD {
  constructor() { }

    // handle create user
  static async save(newData) {

    newData.password = await bcrypt.hash(newData.password.toString(), 10);

    let sql = `INSERT INTO users (name, phone, email,password,role) VALUES (?,?,?,?,?)`;

    return await db.query(sql, [newData.name, newData.phone, newData.email, newData.password, "user"]);
  }

    // handle login
  static async findByEmail(email) {
    let sql = `SELECT id,password,email,role FROM users WHERE email = ?`;
    return await db.execute(sql, [email]);
  }

  // handle reset password
  static async resetPassword(amutaEmail, newPassword) {
    let sql = `UPDATE amutot SET password= ? WHERE email = ?`
    return await db.query(sql, [newPassword, amutaEmail])
  }

}
export default UsersCRUD;