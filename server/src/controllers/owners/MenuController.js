import MenuModel from '../../models/owners/MenuModel.js';
import MenuValidations from '../../util/owners/MenuValidations.js';

const VALIDATION_ERROR = "Validation error";
const SAVE_ERROR = "Failed to save menu";

class MenuController {
  constructor() {
  }

  // handle add new menu
  static async addMenu(request, response) {
    
    // check that the details inserted its correct
    const validation = MenuValidations.validAddMenu(request.body);
    if (validation.error) {
      console.log(validation.error.details);
      return response.status(400).json({ message: VALIDATION_ERROR, details: validation.error.details });
    }
    
    const { role} = request;
    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }
    // call function to save new menu in SQL
    try {
      const [users, _] = await MenuModel.addMenu(request.body);
      response.status(200).json(users);
    } catch (error) {
      response.status(400).json({ message: SAVE_ERROR, details: error });
      console.log(error);
    }
  };

  // handle update menu details
  static async updateMenu(request, response) {

    // check that the details inserted its correct
    const validation = MenuValidations.validUpdateMenu(request.body);
    if (validation.error) {
      console.log(validation.error.details);
      return response.status(400).json({ message: VALIDATION_ERROR, details: validation.error.details });
    }
    
    const {role} = request;
    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }
    // call function to save new menu in SQL
    try {
      const [users, _] = await MenuModel.updateMenu(request.body);
      response.status(200).json(users);
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
      const [user, _] = await MenuModel.getMenusDetails(restId);
      if (user[0].length === 0) {
        return response.status(400).json("no menu found");
      }
      response.status(200).json(user);
    } catch (error) {
      response.status(400).json(error);
      console.log(error);
    }
  };

   


}

export default MenuController;

