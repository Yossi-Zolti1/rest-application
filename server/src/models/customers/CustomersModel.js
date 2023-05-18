import UsersDB from "../../../config/models/users.js";


class CustomersModel {
  constructor() { }

  // handle create user
  static async save(newData) {

    const newUser = await UsersDB.create({
      name: newData.name,
      phone: newData.phone,
      email: newData.email,
      password: newData.password,
      role: 'user'
    });
    return newUser;
  }



}
export default CustomersModel;