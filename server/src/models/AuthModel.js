import dotenv from 'dotenv';
import UsersDB from "../../config/models/users.js";
dotenv.config();

class AuthModel {
  constructor() { }

   // handle reset password
   static async resetPassword(amutaEmail, newPassword) {
    
    const updatedPass = await UsersDB.update(
      { password: newPassword },
      { where: { email: amutaEmail } }
    );

    return updatedPass;
  }
  
}
export default AuthModel;