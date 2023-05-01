import bcrypt from 'bcrypt';
import UsersFunctions from '../models/UsersFunctions.js';

const LOGIN_FAILED_ERROR = "Authentication failed";
const VALIDATION_ERROR = "Validation error";
const SAVE_ERROR = "Failed to save user";

class User {
  constructor() {
  }

  
  // API
  static async Login(request, response) {

    const { email, password } = request.body;
    try {
      const validation = UsersFunctions.validLogin({ email, password });
      if (validation.error) {
        console.log(validation.error.details);
        return response.status(400).json({ message: VALIDATION_ERROR, details: validation.error.details });
      }
  
      const [users] = await UsersFunctions.findByEmail(email);
      const user = users[0];
      if (!user?.email) {
        return response.status(400).json({ message: LOGIN_FAILED_ERROR });
      }
  
      const savedPassword = user.password;
      const comparePass = await bcrypt.compare(password, savedPassword);
  
      if (!comparePass) {
        return response.status(401).json({ message: LOGIN_FAILED_ERROR });
      }
  
      const { id, email: userEmail, role } = user;
      const newToken = await UsersFunctions.genToken(id, userEmail, role);
  
      return response.status(200).json({ token: newToken });
    } catch (error) {
      console.log(error);
      return response.status(400).json(error);
    }
  };

  static async createUser(request, response) {
    const { email, phone, name, password } = request.body;
    const userData = { email, phone, name, password };
  
    try {
      const validation = UsersFunctions.validAddUser(userData);
      if (validation.error) {
        console.log(validation.error.details);
        return response.status(400).json({ message: VALIDATION_ERROR, details: validation.error.details });
      }
  
      try {
        const [users, _] = await UsersFunctions.save(userData);
        response.status(200).json(users.insertId);
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

export default User;

