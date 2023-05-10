import AdminCRUD from '../../models/AdminCRUD.js';
import AdminValidations from './AdminValidations.js';
import Mail from '../MailSender.js';

const VALIDATION_ERROR = "Validation error";
const SAVE_ERROR = "Failed to save user";
const SEND_MAIL_ERROR = "Failed to sent email";

class Admin {
  constructor() {
  }

  // code 1 part 2 
  static async createRestManager(request, response) {
    const { email, phone, name, password } = request.body;
    const managerData = { email, phone, name, password };
    const role = request.role

    if (role !== 'admin') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }
    try {
      // validate the details inserted to create rest owner
      const validation = AdminValidations.validAddManager(managerData);
      if (validation.error) {
        console.log(validation.error.details);
        return response.status(400).json({ message: VALIDATION_ERROR, details: validation.error.details });
      }

      try {
        // Save the manager data
        const [users, _] = await AdminCRUD.save(managerData);
  
        try {
          // Send the welcome email to the new manager
          await Mail.sendEmail(email, 'IDNull', 'tokenNull', 'createOwner', password);
          res.status(200).json({ message: 'Manager created successfully.', id: users.insertId });
        } catch (error) {
          console.error(error);
          res.status(400).json({ message: SEND_MAIL_ERROR });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: SAVE_ERROR });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }





}

export default Admin;

