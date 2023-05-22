import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class Token {
  constructor() {
  }

  static async genToken(id, email, name, role,restId, tokef) {
    let token = jwt.sign({ _id: id, _email: email, _name: name, _role: role, _restId: restId }, process.env.SECRET_WORD, { expiresIn: tokef })
    return token;
  }

}

export default Token;
