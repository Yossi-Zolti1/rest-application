import bcrypt from 'bcrypt';
import AuthModel from '../models/AuthModel.js';
import CommonModel from '../models/CommonModel.js';
import AuthValidations from '../util/AuthValidations.js';
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
      const validation = AuthValidations.validLogin({ email, password });
      if (validation.error) {
        console.log(validation.error.details);
        return response.status(400).json({ message: VALIDATION_ERROR, details: validation.error.details });
      }

      const [users] = await CommonModel.findByEmail(email);
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
      const newToken = await Token.genToken(id, userEmail, role, "1d");

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
      const validation = AuthValidations.validAEmailRessetPass({email});
      if (validation.error) {
        console.log(validation.error.details);
        return response.status(400).json({ message: VALIDATION_ERROR, details: validation.error.details });
      }


      let user = await CommonModel.findByEmail(email);
      if (!user[0][0]?.email.length > 0) {
        return response.status(401).json("האימייל לא רשום במערכת");
      }
      const userRecord = user[0][0];

      const token = await Token.genToken(userRecord.id, userRecord.email, userRecord.role, "1h");
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
        const [users2, _] = await AuthModel.resetPassword(email, hashedPassword);
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
