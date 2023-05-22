import bcrypt from 'bcrypt';
import AuthModel from '../models/AuthModel.js';
import CommonModel from '../models/CommonModel.js';
import AuthValidations from '../util/AuthValidations.js';
import RestaurantModel from '../models/owners/RestaurantModel.js';
import Token from '../util/Token.js';
import Mail from '../util/MailSender.js';

const LOGIN_FAILED_ERROR = "Authentication failed";
const VALIDATION_ERROR = "Validation error";

class AuthController {
  constructor() {
  }

  // code 2 part 1
  static async Login(request, response) {

    const { email, password } = request.body;
    try {
      const users  = await CommonModel.findByEmail(email);
      const user = users;
      if (!user?.email) {
        return response.status(400).json({ message: LOGIN_FAILED_ERROR });
      }

      const savedPassword = user.password;
      const comparePass = await bcrypt.compare(password, savedPassword);

      if (!comparePass) {
        return response.status(401).json({ message: LOGIN_FAILED_ERROR });
      }
      const { id, name, role } = user;
      let restId = "";

       // get rest id for owner
       if (role === 'owner') {
        const restaurant = await RestaurantModel.getRestDetails(id);
        if (restaurant[0]) {
           restId = restaurant[0].id;
           console.log(restId);
        }
        else {
         restId = "";
        }
      }

      const newToken = await Token.genToken(id, email, name, role, restId, "1d");

      return response.status(200).json({ token: newToken });
    } catch (error) {
      console.log(error);
      return response.status(400).json(error);
    }
  };

  
  // code 2 part 4
  // כפתור שכחתי סיסמה בלוגאין
  static async forgotPassword(request, response) {

    const { email } = request.body;
    try {
      
      const user = await CommonModel.findByEmail(email);
      if (!user?.email) {
        return response.status(401).json("האימייל לא רשום במערכת");
      }
      const userRecord = user;

      const token = await Token.genToken(userRecord.id, userRecord.email, userRecord.name, userRecord.role,"", "1h");
      await Mail.sendEmail(email, userRecord.id, token, "ressetPass", "passwordNull");
      response.status(200).json({ mailSent: true });
    } catch (error) {
      console.error(error);
      response.status(500).json("Internal server error");
    }

  };
  // שינוי סיסמה
  static async resetPassword(request, response) {

    const { newPassword } = request.body;
    const email = request.email;
    try {
      let validUser = AuthValidations.validResetPassword({newPassword});
      if (validUser.error) {
        console.log(validUser.error.details);
        return response.status(400).json(validUser.error.details);
      }

      try {
        const hashedPassword = await bcrypt.hash(newPassword.toString(), 10);
        const user = await AuthModel.resetPassword(email, hashedPassword);
        response.status(200).json("passwoerd reseted successfully");
      } catch (error) {
        response.status(400).json(error);
        console.log(error);
      }
    } catch (error) {
      response.status(400).json(error);
      console.log(error);
    }
  };


}

export default AuthController;

