import db from "../../../config/database/db.js";
import dotenv from 'dotenv';
dotenv.config();

class MenuModel {
  constructor() { }



  static async addMenu(menu) {
    let sql = `INSERT INTO menus (name, restaurant_id) VALUES (?,?)`;
    return await db.query(sql, [menu.name, menu.restId]);
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
export default MenuModel;