import joi from "joi";

class ItemValidations {
  constructor() {
  }

  static validAddItem(body) {
    let userSchema = joi.object({
      name: joi.string().trim().required(),
      description: joi.string().trim().required(),
      price: joi.string().trim().required(),
      image: joi.string().trim().allow('', null),
      comment: joi.string().trim().allow('', null),
      departmentId: joi.string().trim().required(),
    });
    return userSchema.validate(body)
  }

  // static validUpdateRest(body) {
  //   let userSchema = joi.object({
  //     name: joi.string().trim().required(),
  //     phone: joi.string().trim().allow('', null),
  //     street: joi.string().trim().required(),
  //     city: joi.string().trim().required(),
  //     kashrut: joi.string().trim().allow('', null),
  //     type: joi.string().trim().required(),
  //     logo: joi.string().trim().allow('', null),
  //   });
  //   return userSchema.validate(body)
  // }

}

export default ItemValidations;
