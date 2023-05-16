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

/*
   // get retaurant details
   static async getRestDetails(request, response) {
    const { userId, role} = request;
    console.log(userId);
    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }
    
    try {
      const [user, _] = await MenuModel.getRestDetails(userId);
      console.log(user);
      if (user[0].length === 0) {
        return response.status(400).json("no rest found");
      }
      response.status(200).json(user[0]);
    } catch (error) {
      response.status(400).json(error);
      console.log(error);
    }
  };

   // handle update restaurants details
   static async updateRest(request, response) {

    // check that the details inserted its correct
    const validation = MenuValidations.validUpdateRest(request.body);
    if (validation.error) {
      console.log(validation.error.details);
      return response.status(400).json({ message: VALIDATION_ERROR, details: validation.error.details });
    }
    
    const { userId, role} = request;
    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }
    // call function to save new rest in SQL
    try {
      const [users, _] = await MenuModel.updateRest(request.body, userId);
      response.status(200).json(users);
    } catch (error) {
      response.status(400).json({ message: SAVE_ERROR, details: error });
      console.log(error);
    }
  };
*/

}

export default MenuController;

