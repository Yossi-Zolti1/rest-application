import CustomersModel from '../../models/customers/CustomersModel.js';

const SAVE_ERROR = "Failed to save user";

class CustomersController {
  constructor() {
  }

  // code 1 part 1
  static async createUser(request, response) {
    const { email, phone, name, password } = request.body;
    const userData = { email, phone, name, password };

      try {
        const user = await CustomersModel.save(userData);
        response.status(200).json(user.id);
      } catch (error) {
        console.log(error);
        response.status(400).json({ message: SAVE_ERROR, details: error });
      }
    
  }


}

export default CustomersController;

