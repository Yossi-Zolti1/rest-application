import UsersDB from "../../config/models/users.js";
import dotenv from 'dotenv';
dotenv.config();

class CommonModel {
  constructor() { }

  // check if email exsit
  static async findByEmail(email) {
   
      const user = await UsersDB.findOne({
        attributes: ['id', 'password', 'email', 'name', 'role'],
        where: {
          email: email
        }
      }); 
      return user;
   
  }
  
}
export default CommonModel;