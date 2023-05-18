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

  static async updateItem(item) {

    const updatedItem = await ItemDB.update(
      { name: item.name, image: item.image },
      { where: { id: item.itemId } }
    );
    return updatedItem;
}

static async getItemsDetails(departmentId) {

  const items = await ItemDB.findAll({
    where: { department_id: departmentId }
  });
  return items;
}

//   static async updateLogo(logoLink, userId) {
//     let sql = `UPDATE restaurants SET logo= ? WHERE ownerID = ?`
//      return await db.query(sql, [logoLink, userId])
//   }
  
}
export default ItemModel;