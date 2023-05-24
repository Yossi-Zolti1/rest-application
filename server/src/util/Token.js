import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class Token {
  constructor() {
  }

  static async genToken(id, email, name, role,restId, tokef) {

    let date = new Date();
    date.setDate(date.getDate() + 1);
    date = date.toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' });
    let expires = date;

    let token = jwt.sign({ _id: id, _email: email, _name: name, _role: role, _restId: restId, _expiresIn: expires }, process.env.SECRET_WORD, { expiresIn: tokef })
    return token;
  }

}

export default Token;
