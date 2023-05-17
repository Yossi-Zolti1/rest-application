import db from "../../../config/database/db.js";
import dotenv from 'dotenv';
dotenv.config();

class MenuModel {
  constructor() { }

  static async addMenu(menu) {
    let sql = `INSERT INTO menus (name, restaurant_id) VALUES (?,?)`;
    return await db.query(sql, [menu.name, menu.restId]);
  }

  static async updateMenu(menu) {
    let sql = `UPDATE menus SET name= ? WHERE id = ?`
    return await db.query(sql, [menu.name, menu.menuId])
  }

  // get details of all menus
    static async getMenusDetails(restId) {
      let sql = `SELECT * FROM menus WHERE restaurant_id = ?`;
      return await db.execute(sql, [restId]);
    }


}
export default MenuModel;