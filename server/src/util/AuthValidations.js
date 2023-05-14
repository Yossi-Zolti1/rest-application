import joi from "joi";

class AuthValidations {
  constructor() {
  }

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
  
  static validAEmailRessetPass(body) {
    let userSchema = joi.object({
      email: joi.string().required().email().messages({ 'string.email': 'Email error', }),
    });
    return userSchema.validate(body)
  }

  static validResetPassword(body) {
    let userSchema = joi.object({
      password: joi.string().trim().min(9)
        .regex(/[A-Z]/) // at least one uppercase letter
        .regex(/[a-z]/) // at least one lowercase letter
        .regex(/[0-9]/) // at least one number
        .required(),
    });
    return userSchema.validate(body)
  }

}

export default AuthValidations;
