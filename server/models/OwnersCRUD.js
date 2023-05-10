import db from "../database/db.js";
import dotenv from 'dotenv';
dotenv.config();

class OwnersCRUD {
  constructor() { }

  static async getRestDetails(userId) {
    let sql = `SELECT * FROM restaurants WHERE ownerID = ?`;
    return await db.execute(sql, [userId]);
  }
  
}
export default OwnersCRUD;