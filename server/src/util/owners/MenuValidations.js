import joi from "joi";

class RestaurantValidations {
  constructor() {
  }

  static validAddMenu(body) {
    let userSchema = joi.object({
      name: joi.string().trim().required(),
      restId: joi.string().trim().required(),
    });
    return userSchema.validate(body)
  }

  static validUpdateMenu(body) {
    let userSchema = joi.object({
      name: joi.string().trim().required(),
      menuId: joi.string().trim().required(),
    });
    return userSchema.validate(body)
  }
  

}

export default RestaurantValidations;
