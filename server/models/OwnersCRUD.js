import db from "../database/db.js";
import dotenv from 'dotenv';
dotenv.config();

class OwnersCRUD {
  constructor() { }

  static async getRestDetails(userId) {
    let sql = `SELECT * FROM restaurants WHERE ownerID = ?`;
    return await db.execute(sql, [userId]);
  }

  static async addRest(rest, userId) {
    let sql = `INSERT INTO restaurants (name, street, city, phone, kashrut, type, logo, ownerID) VALUES (?,?,?,?,?,?,?,?)`;
    return await db.query(sql, [rest.name, rest.street, rest.city, rest.phone, rest.kashrut, rest.type, rest.logo, userId]);
  }
  
}
export default OwnersCRUD;