import bcrypt from 'bcrypt';
import UsersDB from "../../../config/models/users.js";


class CustomersModel {
  constructor() { }

  // handle create user
  static async save(newData) {

    const hashedPassword = await bcrypt.hash(newData.password.toString(), 10);

    const newUser = await UsersDB.create({
      name: newData.name,
      phone: newData.phone,
      email: newData.email,
      password: hashedPassword,
      role: 'user'
    });
    return newUser;
  }



}
export default CustomersModel;