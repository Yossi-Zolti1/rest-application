import dotenv from 'dotenv';
import DepartmentDB from "../../../config/models/departments.js";
dotenv.config();

class DepartmentModel {
  constructor() { }



  static async addDepartment(department) {

    const newDepartment = await DepartmentDB.create({
      name: department.name,
      image: department.image,
      menu_id: department.menuId
    });
    return newDepartment;
  }

    static async updateDepartment(department) {

      const updatedDepartment = await DepartmentDB.update(
        { name: department.name, image: department.image },
        { where: { id: department.departmentId } }
      );
      return updatedDepartment;
  }

  static async deleteDepartment(departmentId) {
    
    const deletedDepartment = await DepartmentDB.destroy(
      { where: { id: departmentId } }
    );
    return deletedDepartment;
}

  static async getDepartmentsDetails(menuId) {

    const departments = await DepartmentDB.findAll({
      where: { menu_id: menuId }
    });
    return departments;
  }



//   static async updateLogo(logoLink, userId) {
//     let sql = `UPDATE restaurants SET logo= ? WHERE ownerID = ?`
//      return await db.query(sql, [logoLink, userId])
//   }
  
}
export default DepartmentModel;