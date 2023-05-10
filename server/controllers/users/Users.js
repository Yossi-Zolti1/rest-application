import bcrypt from 'bcrypt';
import UsersCRUD from '../../models/UsersCRUD.js';
import UsersValidations from './UsersValidations.js';
import Utils from '../Utils.js';
<<<<<<< HEAD
import Mail from '../MailSender.js';

=======
import Mail from '../MailResetPass.js';
>>>>>>> 6558c7edcb228838a3a5f2d818301d1e6f972651
const LOGIN_FAILED_ERROR = "Authentication failed";
const VALIDATION_ERROR = "Validation error";
const SAVE_ERROR = "Failed to save user";

class User {
  constructor() {
  }


  // code 2 part 1
  static async Login(request, response) {

    const { email, password } = request.body;
    try {
      const validation = UsersValidations.validLogin({ email, password });
      if (validation.error) {
        console.log(validation.error.details);
        return response.status(400).json({ message: VALIDATION_ERROR, details: validation.error.details });
      }

      const [users] = await UsersCRUD.findByEmail(email);
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
      const newToken = await Utils.genToken(id, userEmail, role, "1d");

      return response.status(200).json({ token: newToken });
    } catch (error) {
      console.log(error);
      return response.status(400).json(error);
    }
  };

  // code 1 part 1
  static async createUser(request, response) {
    const { email, phone, name, password } = request.body;
    const userData = { email, phone, name, password };

    try {
      const validation = UsersValidations.validAddUser(userData);
      if (validation.error) {
        console.log(validation.error.details);
        return response.status(400).json({ message: VALIDATION_ERROR, details: validation.error.details });
      }

      try {
        const [users, _] = await UsersCRUD.save(userData);
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


  // code 2 part 4
  // כפתור שכחתי סיסמה בלוגאין
  static async forgotPassword(request, response) {

    const { email } = request.body;
    try {
      const validation = UsersValidations.validAEmailRessetPass({email});
      if (validation.error) {
        console.log(validation.error.details);
        return response.status(400).json({ message: VALIDATION_ERROR, details: validation.error.details });
      }


      let user = await UsersCRUD.findByEmail(email);
      if (!user[0][0]?.email.length > 0) {
        return response.status(401).json("האימייל לא רשום במערכת");
      }
      const userRecord = user[0][0];

      const token = await Utils.genToken(userRecord.id, userRecord.email, userRecord.role, "1h");
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
      let validUser = UsersValidations.validResetPassword({newPassword});
      if (validUser.error) {
        console.log(validUser.error.details);
        return response.status(400).json(validUser.error.details);
      }

      try {
<<<<<<< HEAD
        const hashedPassword = await bcrypt.hash(newPassword.toString(), 10);
        const [users2, _] = await UsersCRUD.resetPassword(email, hashedPassword);
        response.status(200).json("passwoerd reseted successfully");
=======
        req.body.newPassword = await bcrypt.hash(req.body.newPassword.toString(), 10);
        const [users2, _] = await UsersCRUD.resetPassword(req.email, req.body.newPassword);
        response.status(200).json(users2);
>>>>>>> 6558c7edcb228838a3a5f2d818301d1e6f972651
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

export default User;

