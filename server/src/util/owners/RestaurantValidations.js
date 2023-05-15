import joi from "joi";

class RestaurantValidations {
  constructor() {
  }

  static validAddRest(body) {
    let userSchema = joi.object({
      name: joi.string().trim().required(),
      phone: joi.string().trim().allow('', null),
      street: joi.string().trim().required(),
      city: joi.string().trim().required(),
      kashrut: joi.string().trim().allow('', null),
      type: joi.string().trim().required(),
      logo: joi.string().trim().allow('', null),
      my: joi.string().allow('', null),
    });
    return userSchema.validate(body)
  }

  static validUpdateRest(body) {
    let userSchema = joi.object({
      name: joi.string().trim().required(),
      phone: joi.string().trim().allow('', null),
      street: joi.string().trim().required(),
      city: joi.string().trim().required(),
      kashrut: joi.string().trim().allow('', null),
      type: joi.string().trim().required(),
      logo: joi.string().trim().allow('', null),
    });
    return userSchema.validate(body)
  }

}

export default RestaurantValidations;
