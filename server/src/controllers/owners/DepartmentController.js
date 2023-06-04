import DepartmentModel from '../../models/owners/DepartmentModel.js';
import UploadImageController from '../owners/UploadImageController.js';

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

    if (request.files) {
      // If file is present in the request, direct to upload controller
      const link = await UploadImageController.uploadImage(request, response, "departments");
      if (!link.link1) {
        return response.status(405).json({ msg: `Error: Upload file failed` });
      }
      request.body.image = link.link1;
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

    if (request.files) {
      // If file is present in the request, direct to upload controller
      const link = await UploadImageController.uploadImage(request, response, "departments");
      if (!link.link1) {
        return response.status(405).json({ msg: `Error: Upload file failed` });
      }
      request.body.image = link.link1;
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

  // handle delete departments details
 static async deleteDepartment(request, response) {

  const { role } = request;
  if (role !== 'owner') {
    return response.status(403).json({ message: "You don't have permission to perform this action." });
  }

  const departmentId = request.query.departmentId;

  try {
    const department = await DepartmentModel.deleteDepartment(departmentId);
    response.status(200).json(department);
  } catch (error) {
    response.status(400).json({ message: "error delete department", details: error });
    console.log(error);
  }
};

   // get all departments details
   static async getDepartmentsDetails(request, response) {
    const {role} = request;
    const menuId = request.query.menuId;

    // if (role !== 'owner') {
    //   return response.status(403).json({ message: "You don't have permission to perform this action." });
    // }
    
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

   // get single department details
   static async getSingleDepartmentDetails(request, response) {
    const { role} = request;
    const departmentId = request.query.departmentId;

    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }
    
    try {
      const department = await DepartmentModel.getSingleDepartmentDetails(departmentId);
      if (!department) {
        return response.status(400).json("no department found");
      }
      response.status(200).json(department);
    } catch (error) {
      response.status(400).json(error);
      console.log(error);
    }
  };

}

export default DepartmentController;

