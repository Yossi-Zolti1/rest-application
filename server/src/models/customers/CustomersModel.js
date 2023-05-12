import db from "../../../config/database/db.js";
import bcrypt from 'bcrypt';

class CustomersModel {
  constructor() { }

    // handle create user
  static async save(newData) {

    newData.password = await bcrypt.hash(newData.password.toString(), 10);

    let sql = `INSERT INTO users (name, phone, email,password,role) VALUES (?,?,?,?,?)`;

    console.log(77777777);
    return await db.query(sql, [newData.name, newData.phone, newData.email, newData.password, "user"]);
  }

  // handle reset password
  static async resetPassword(amutaEmail, newPassword) {
    let sql = `UPDATE amutot SET password= ? WHERE email = ?`
    return await db.query(sql, [newPassword, amutaEmail])
  }

}
export default CustomersModel;