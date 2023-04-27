import bcrypt from 'bcrypt';
import UsersFunctions from '../models/UsersFunctions.js';

class User {
  constructor() {
  }
  // API
  static async Login(request, response) {
    let newData = {
      email: request.body.email,
      password: request.body.password
    }
    try {
      let validUser = await UsersFunctions.validLogin(newData);
      if (validUser.error) {
        console.log(validUser.error.details);
        return response.status(400).json(validUser.error.details);
      }

      let user = await UsersFunctions.findByEmail(newData.email);
      if (!user[0][0]?.email.length > 0) {
        return response.status(400).json("auth failed");
      }

      const savedPassword = user[0][0]?.password;

      let comparePass = await bcrypt.compare(newData.password, savedPassword);
      if (!comparePass) {
        return response.status(401).json("auth failed");
      }

      let newToken = await UsersFunctions.genToken(user[0][0]?.id,user[0][0]?.email);
      return response.status(200).json(newToken);

    } catch (error) {
      response.status(400).json(error);
      console.log(error);
    }
  };


  static async createUser(request, response) {
    let newDataToValid = {
      email: request.body.email,
      phone: request.body.phone,
      name: request.body.userName,
      password: request.body.password,
    }

     try {
      let validUser = await UsersFunctions.validAddUser(newDataToValid);
      if (validUser.error) {
        console.log(validUser.error.details);
        return response.status(400).json(validUser.error.details);
      }

      try {
        const [users, _] = await UsersFunctions.save(request.body);
        response.status(200).json(users.insertId);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      response.status(400).json(error);
      console.log(error);
    }
}


}

export default User;

