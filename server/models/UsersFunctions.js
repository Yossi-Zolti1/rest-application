import db from "../database/db.js";
import joi from "joi";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

class UsersFunctions {
  constructor() { }

    // handle create user
  static validAddUser(body) {
    let userSchema = joi.object({
      email: joi.string().required().email().messages({ 'string.email': 'Email error', }),
      phone: joi.string().trim().min(9).pattern(/^[0-9]+$/).required(),
      name: joi.string().trim().min(3).pattern(/^[a-zA-Z]+$/).required(),
      password: joi.string().trim().min(9)
        .regex(/[A-Z]/) // at least one uppercase letter
        .regex(/[a-z]/) // at least one lowercase letter
        .regex(/[0-9]/) // at least one number
        .required(),
    });
    return userSchema.validate(body)
  }

  static async save(newData) {

    newData.password = await bcrypt.hash(newData.password.toString(), 10);

    let sql = `INSERT INTO users (name, phone, email,password,role) VALUES (?,?,?,?,?)`;

    return await db.query(sql, [newData.name, newData.phone, newData.email, newData.password, "user"]);
  }

    // handle login
  static validLogin(body) {
    let userSchema = joi.object({
      email: joi.string().required().email().messages({ 'string.email': 'Email error', }),
      password: joi.string().trim().min(9)
        .regex(/[A-Z]/) // at least one uppercase letter
        .regex(/[a-z]/) // at least one lowercase letter
        .regex(/[0-9]/) // at least one number
        .required(),
    });
    return userSchema.validate(body)
  }

  static async findByEmail(email) {
    let sql = `SELECT id,password,email,role FROM users WHERE email = ?`;
    return await db.execute(sql, [email]);
  }

  static async genToken(id, email, role, tokef) {
    let token = jwt.sign({ _id: id, _email: email, _role: role }, process.env.SECRET_WORD, { expiresIn: tokef })
    return token;
  }

  // handle reset password
  static validResetPassword(body) {
    let userSchema = joi.object({
      newPassword: joi.string().trim().min(6),
    });
    return userSchema.validate(body)
  }

  static async resetPassword(amutaEmail, newPassword) {
    let sql = `UPDATE amutot SET password= ? WHERE email = ?`
    return await db.query(sql, [newPassword, amutaEmail])
  }

}
export default UsersFunctions;