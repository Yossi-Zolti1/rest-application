import ItemModel from '../../models/owners/ItemModel.js';
import UploadImageController from '../owners/UploadImageController.js';

const SAVE_ERROR = "Failed to save item";

class ItemController {
  constructor() {
  }

  // handle add new menu
  static async addItem(request, response) {
    
    const { role} = request;
    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }

    if (request.files) {
      // If file is present in the request, direct to upload controller
      const link = await UploadImageController.uploadImage(request, response, "items");
      if (!link.link1) {
        return response.status(405).json({ msg: `Error: Upload file failed` });
      }
      request.body.image = link.link1;
    }

    // call function to save new department in SQL
    try {
      const item = await ItemModel.addItem(request.body);
      response.status(200).json(item);
    } catch (error) {
      response.status(400).json({ message: SAVE_ERROR, details: error });
      console.log(error);
    }
  };

  // handle update item details
  static async updateItem(request, response) {

    const {role} = request;
    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }

    if (request.files) {
      // If file is present in the request, direct to upload controller
      const link = await UploadImageController.uploadImage(request, response, "items");
      if (!link.link1) {
        return response.status(405).json({ msg: `Error: Upload file failed` });
      }
      request.body.image = link.link1;
    }

    // call function to save new menu in SQL
    try {
      const item = await ItemModel.updateItem(request.body);
      response.status(200).json(item);
    } catch (error) {
      response.status(400).json({ message: SAVE_ERROR, details: error });
      console.log(error);
    }
  };

  // handle delete item 
 static async deleteItem(request, response) {

  const { role } = request;
  if (role !== 'owner') {
    return response.status(403).json({ message: "You don't have permission to perform this action." });
  }

  const itemId = request.query.itemId;

  try {
    const item = await ItemModel.deleteItem(itemId);
    response.status(200).json(item);
  } catch (error) {
    response.status(400).json({ message: "error delete item", details: error });
    console.log(error);
  }
};

   // get all items details
   static async getItemsDetails(request, response) {
    const {role} = request;
    const departmentId = request.query.departmentId;

    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }
    
    try {
      const items = await ItemModel.getItemsDetails(departmentId);
      if (!items[0]) {
        return response.status(400).json("no items found");
      }
      response.status(200).json(items);
    } catch (error) {
      response.status(400).json(error);
      console.log(error);
    }
  };

    // get single item details
    static async getSingleItemDetails(request, response) {
      const { role} = request;
      const itemId = request.query.itemId;
  
      if (role !== 'owner') {
        return response.status(403).json({ message: "You don't have permission to perform this action." });
      }
      
      try {
        const item = await ItemModel.getSingleItemDetails(itemId);
        if (!item[0]) {
          return response.status(400).json("no item found");
        }
        response.status(200).json(item);
      } catch (error) {
        response.status(400).json(error);
        console.log(error);
      }
    };

}

export default ItemController;

