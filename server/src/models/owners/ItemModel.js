import dotenv from 'dotenv';
import ItemDB from "../../../config/models/items.js";
dotenv.config();

class ItemModel {
  constructor() { }



  static async addItem(item) {

    const newItem = await ItemDB.create({
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      comment: item.comment,
      department_id: item.departmentId
    });
    return newItem;
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