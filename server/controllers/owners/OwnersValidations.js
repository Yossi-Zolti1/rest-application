import joi from "joi";

class OwnersValidations {
  constructor() {
  }

  static validAddRest(body) {
    let userSchema = joi.object({
      name: joi.string().trim().required(),
      phone: joi.string().trim().min(9).pattern(/^[0-9]+$/),
      street: joi.string().trim().required(),
      city: joi.string().trim().required(),
      kashrut: joi.string().trim(),
      type: joi.string().trim().required(),
      logo: joi.string().trim().required(),
    });
    return userSchema.validate(body)
  }

}

export default OwnersValidations;
