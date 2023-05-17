import joi from "joi";

class DepartmentValidations {
  constructor() {
  }

  static validAddDepartment(body) {
    let userSchema = joi.object({
      name: joi.string().trim().required(),
      image: joi.string().trim().allow('', null),
      menuId: joi.string().trim().required(),
    });
    return userSchema.validate(body)
  }

  static validUpdateDepartment(body) {
    let userSchema = joi.object({
      name: joi.string().trim().required(),
      departmentId: joi.string().trim().required(),
    });
    return userSchema.validate(body)
  }

}

export default DepartmentValidations;
