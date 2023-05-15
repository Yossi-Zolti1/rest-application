import db from "../../../config/database/db.js";
import dotenv from 'dotenv';
dotenv.config();

class ItemModel {
  constructor() { }



  static async addItem(item) {
    let sql = `INSERT INTO items (name, description, price, image, comment, department_id) VALUES (?,?,?,?,?,?)`;
    return await db.query(sql, [item.name, item.description, item.price, item.image, item.comment, item.departmentId]);
  }

//   static async getRestDetails(userId) {
//     let sql = `SELECT * FROM restaurants WHERE ownerID = ?`;
//     return await db.execute(sql, [userId]);
//   }

//   static async updateRest(rest, userId) {
//     let sql = `UPDATE restaurants SET name= ?,street= ?,city= ?,phone= ?,kashrut= ?,type= ? WHERE ownerID = ?`
//      return await db.query(sql, [rest.name, rest.street, rest.city, rest.phone, rest.kashrut, rest.type, userId])
//   }

//   static async updateLogo(logoLink, userId) {
//     let sql = `UPDATE restaurants SET logo= ? WHERE ownerID = ?`
//      return await db.query(sql, [logoLink, userId])
//   }
  
}
export default ItemModel;