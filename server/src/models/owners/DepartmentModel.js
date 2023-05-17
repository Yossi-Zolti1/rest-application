import db from "../../../config/database/db.js";
import dotenv from 'dotenv';
dotenv.config();

class DepartmentModel {
  constructor() { }



  static async addDepartment(department) {
    let sql = `INSERT INTO departments (name,image, menu_id) VALUES (?,?,?)`;
    return await db.query(sql, [department.name, department.image, department.menuId]);
  }

    static async updateDepartment(department) {
    let sql = `UPDATE departments SET name= ?,image= ? WHERE id = ?`
     return await db.query(sql, [department.name, department.image, department.departmentId])
  }

  static async getDepartmentsDetails(menuId) {
    let sql = `SELECT * FROM departments WHERE menu_id = ?`;
    return await db.execute(sql, [menuId]);
  }



//   static async updateLogo(logoLink, userId) {
//     let sql = `UPDATE restaurants SET logo= ? WHERE ownerID = ?`
//      return await db.query(sql, [logoLink, userId])
//   }
  
}
export default DepartmentModel;