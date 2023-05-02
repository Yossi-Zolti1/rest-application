import AdminCRUD from '../../models/AdminCRUD.js';
import AdminValidations from './AdminValidations.js';

const VALIDATION_ERROR = "Validation error";
const SAVE_ERROR = "Failed to save user";

class Admin {
  constructor() {
  }
  
    // code 1 part 2 
  static async createRestManager(request, response) {
    const { email, phone, name, password } = request.body;
    const managerData = { email, phone, name, password };
    const role = request.role

    if (role !== 'admin') {
      return response.status(403).json({ message: "You don't have permission to perform this action."});
    }
    try {
      const validation = AdminValidations.validAddManager(managerData);
      if (validation.error) {
        console.log(validation.error.details);
        return response.status(400).json({ message: VALIDATION_ERROR, details: validation.error.details });
      }
  
      try {
        const [users, _] = await AdminCRUD.save(managerData);
        response.status(200).json({ message: "Manager created successfully.", id: users.insertId });
      } catch (error) {
        console.log(error);
        response.status(400).json({ message: SAVE_ERROR });
      }
    } catch (error) {
      console.log(error);
      response.status(400).json(error);
    }
  }
  
  
  


}

export default Admin;

