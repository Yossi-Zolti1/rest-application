import db from "../database/db.js";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

class UsersFunctions {
  constructor() { }

  static async save(newData) {

    try {
      newData.password = await bcrypt.hash(newData.password.toString(), 10);
    } catch (error) {
      throw new Error('Error hashing password');
    }
    
    try {
      return await db.query(sql, [newData.name, newData.phone, newData.email, newData.password, 'manager']);
    } catch (error) {
      throw new Error('Error saving user data');
    }
  }
  
}
export default UsersFunctions;