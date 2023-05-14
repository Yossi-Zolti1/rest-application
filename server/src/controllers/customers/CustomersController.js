import CustomersModel from '../../models/customers/CustomersModel.js';
import AuthValidations from '../../util/AuthValidations.js';

const LOGIN_FAILED_ERROR = "Authentication failed";
const VALIDATION_ERROR = "Validation error";
const SAVE_ERROR = "Failed to save user";

class CustomersController {
  constructor() {
  }

  // code 1 part 1
  static async createUser(request, response) {
    const { email, phone, name, password } = request.body;
    const userData = { email, phone, name, password };

    try {
      const validation = AuthValidations.validAddUser(userData);
      if (validation.error) {
        console.log(validation.error.details);
        return response.status(400).json({ message: VALIDATION_ERROR, details: validation.error.details });
      }

      try {
        const [users, _] = await CustomersModel.save(userData);
        response.status(200).json(users.insertId);
      } catch (error) {
        console.log(error);
        response.status(400).json({ message: error });
      }
    } catch (error) {
      console.log(error);
      response.status(400).json(error);
    }
  }


}

export default CustomersController;
