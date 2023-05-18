import MenuModel from '../../models/owners/MenuModel.js';

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
    // call function to save new menu in SQL
    try {
      const menu = await MenuModel.updateMenu(request.body);
      response.status(200).json(menu);
    } catch (error) {
      response.status(400).json({ message: SAVE_ERROR, details: error });
      console.log(error);
    }
  };


   // get all menus details
   static async getMenusDetails(request, response) {
    const { role} = request;
    const restId = request.query.restId;

    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }
    
    try {
      const menus = await MenuModel.getMenusDetails(restId);
      if (!menus) {
        return response.status(400).json("no menu found");
      }
      response.status(200).json(menus);
    } catch (error) {
      response.status(400).json(error);
      console.log(error);
    }
  };

   


}

export default MenuController;

