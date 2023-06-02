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
      { name: item.name, description: item.description, price: item.price,
         image: item.image, comment: item.description },
      { where: { id: item.itemId } }
    );
    return updatedItem;
}

static async deleteItem(itemId) {
    
  const deletedItem = await ItemDB.destroy(
    { where: { id: itemId } }
  );
  return deletedItem;
}

static async getItemsDetails(departmentId) {

  const items = await ItemDB.findAll({
    where: { department_id: departmentId }
  });
  return items;
}

// get details of single menu
static async getSingleItemDetails(itemId) {

  const item = await ItemDB.findOne({
    where: { id: itemId }
  });
  return item;
}

  
}
export default ItemModel;