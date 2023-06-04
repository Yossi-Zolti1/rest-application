import MenuModel from '../../models/owners/MenuModel.js';
import UploadImageController from '../owners/UploadImageController.js';

const SAVE_ERROR = "Failed to save menu";

class MenuController {
  constructor() {
  }

  // handle add new menu
  static async addMenu(request, response) {
    
    const { role} = request;
    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }

    if (request.files) {
      // If file is present in the request, direct to upload controller
      const link = await UploadImageController.uploadImage(request, response, "menus");
      if (!link.link1) {
        return response.status(405).json({ msg: `Error: Upload file failed` });
      }
      request.body.image = link.link1;
    }

    // call function to save new menu in SQL
    try {
      const menu = await MenuModel.addMenu(request.body);
      response.status(200).json(menu);
    } catch (error) {
      response.status(400).json({ message: SAVE_ERROR, details: error });
      console.log(error);
    }
  };

  // handle update menu details
  static async updateMenu(request, response) {

    const {role} = request;
    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }

    if (request.files) {
      // If file is present in the request, direct to upload controller
      const link = await UploadImageController.uploadImage(request, response, "menus");
      if (!link.link1) {
        return response.status(405).json({ msg: `Error: Upload file failed` });
      }
      request.body.image = link.link1;
    }
    
    // call function to save new menu in SQL
    try {
      const menu = await MenuModel.updateMenu(request.body);
      response.status(200).json(menu);
    } catch (error) {
      response.status(400).json({ message: SAVE_ERROR, details: error });
      console.log(error);
    }
  };

 // handle delete restaurants details
 static async deleteMenu(request, response) {

  const { role } = request;
  if (role !== 'owner') {
    return response.status(403).json({ message: "You don't have permission to perform this action." });
  }
  const menuId = request.query.menuId;

  try {
    const menu = await MenuModel.deleteMenu(menuId);
    response.status(200).json(menu);
  } catch (error) {
    response.status(400).json({ message: "error delete menu", details: error });
    console.log(error);
  }
};

   // get all menus details
   static async getMenusDetails(request, response) {
    const { role} = request;
    const restId = request.query.restId;

    // if (role !== 'owner') {
    //   return response.status(403).json({ message: "You don't have permission to perform this action." });
    // }
    
    try {
      const menus = await MenuModel.getMenusDetails(restId);
      if (!menus[0]) {
        return response.status(400).json("no menu found");
      }
      response.status(200).json(menus);
    } catch (error) {
      response.status(400).json(error);
      console.log(error);
    }
  };

   // get single menu details
   static async getSingleMenuDetails(request, response) {
    const { role} = request;
    const menuId = request.query.menuId;

    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }
    
    try {
      const menu = await MenuModel.getSingleMenuDetails(menuId);
      if (!menu) {
        return response.status(400).json("no menu found");
      }
      response.status(200).json(menu);
    } catch (error) {
      response.status(400).json(error);
      console.log(error);
    }
  };



}

export default MenuController;

