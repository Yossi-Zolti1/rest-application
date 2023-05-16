import db from "../../../config/database/db.js";
import dotenv from 'dotenv';
dotenv.config();

class DepartmentModel {
  constructor() { }



  static async addDepartment(department) {
    let sql = `INSERT INTO departments (name,image, menu_id) VALUES (?,?,?)`;
    return await db.query(sql, [department.name, department.image, department.menuId]);
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
export default DepartmentModel;