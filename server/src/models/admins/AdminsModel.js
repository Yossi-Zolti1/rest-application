import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import UsersDB from "../../../config/models/users.js";

dotenv.config();

class AdminsModel {
  constructor() { }

  static async save(newData) {
      
      const newUser = await UsersDB.create({
        name: newData.name,
        phone: newData.phone,
        email: newData.email,
        password: newData.password,
        role: 'owner'
      });  
      return newUser;
   
  }
  
}
export default AdminsModel;