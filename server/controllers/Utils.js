import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class Utils {
  constructor() {
  }

  static async genToken(id, email, role, tokef) {
    let token = jwt.sign({ _id: id, _email: email, _role: role }, process.env.SECRET_WORD, { expiresIn: tokef })
    return token;
  }

}

export default Utils;
