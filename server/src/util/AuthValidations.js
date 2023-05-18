import joi from "joi";

class AuthValidations {
  constructor() {
  }

  static validResetPassword(body) {
    let userSchema = joi.object({
      newPassword: joi.string().trim().min(9)
        .regex(/[A-Z]/) // at least one uppercase letter
        .regex(/[a-z]/) // at least one lowercase letter
        .regex(/[0-9]/) // at least one number
        .required(),
    });
    return userSchema.validate(body)
  }

}

export default AuthValidations;

