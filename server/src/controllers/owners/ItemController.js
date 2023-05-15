import ItemModel from '../../models/owners/ItemModel.js';
import ItemValidations from '../../util/owners/ItemValidations.js';

const VALIDATION_ERROR = "Validation error";
const SAVE_ERROR = "Failed to save item";

class ItemController {
  constructor() {
  }

  // handle add new menu
  static async addItem(request, response) {
    
    // check that the details inserted its correct
    const validation = ItemValidations.validAddItem(request.body);
    if (validation.error) {
      console.log(validation.error.details);
      return response.status(400).json({ message: VALIDATION_ERROR, details: validation.error.details });
    }
    
    const { role} = request;
    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }
    // call function to save new department in SQL
    try {
      const [users, _] = await ItemModel.addItem(request.body);
      response.status(200).json(users);
    } catch (error) {
      response.status(400).json({ message: SAVE_ERROR, details: error });
      console.log(error);
    }
  };

}

export default ItemController;

