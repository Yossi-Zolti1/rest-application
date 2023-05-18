import DepartmentModel from '../../models/owners/DepartmentModel.js';

const SAVE_ERROR = "Failed to save department";

class DepartmentController {
  constructor() {
  }

  // handle add new menu
  static async addDepartment(request, response) {
    
    const { role} = request;
    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }
    // call function to save new department in SQL
    try {
      const department = await DepartmentModel.addDepartment(request.body);
      response.status(200).json(department);
    } catch (error) {
      response.status(400).json({ message: SAVE_ERROR, details: error });
      console.log(error);
    }
  };
  
   // handle update department details
   static async updateDepartment(request, response) {

    const {role} = request;
    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }
    // call function to save new menu in SQL
    try {
      const department = await DepartmentModel.updateDepartment(request.body);
      response.status(200).json(department);
    } catch (error) {
      response.status(400).json({ message: SAVE_ERROR, details: error });
      console.log(error);
    }
  };

   // get all departments details
   static async getDepartmentsDetails(request, response) {
    const {role} = request;
    const menuId = request.query.menuId;

    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }
    
    try {
      const departments = await DepartmentModel.getDepartmentsDetails(menuId);
      if (!departments[0]) {
        return response.status(400).json("no departments found");
      }
      response.status(200).json(departments);
    } catch (error) {
      response.status(400).json(error);
      console.log(error);
    }
  };


}

export default DepartmentController;

