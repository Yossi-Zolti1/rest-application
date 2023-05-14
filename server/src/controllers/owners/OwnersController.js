import OwnersModel from '../../models/owners/OwnersModel.js';
import OwnersValidations from '../../util/owners/OwnersValidations.js';
import UploadLogoController from './UploadLogoController.js';

const VALIDATION_ERROR = "Validation error";
const SAVE_ERROR = "Failed to save rest";

class OwnersController {
  constructor() {
  }

  // get retaurant details
  static async getRestDetails(request, response) {
    const { userId, role} = request;
    console.log(userId);
    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }
    
    try {
      const [user, _] = await OwnersModel.getRestDetails(userId);
      console.log(user);
      if (user[0].length === 0) {
        return response.status(400).json("no rest found");
      }
      response.status(200).json(user[0]);
    } catch (error) {
      response.status(400).json(error);
      console.log(error);
    }
  };

  // handle add new restaurants
  static async addRest(request, response) {

    if (request.files) {
      // If file is present in the request, direct to upload controller
     const link = await UploadLogoController.uploadLogo(request, response);
     if (!link.link1) {
       return response.status(405).json({ msg: `Error: Upload file failed` });
     }
     request.body.logo = link.link1;
   }
   
    // check that the details inserted its correct
    const validation = OwnersValidations.validAddRest(request.body);
    if (validation.error) {
      console.log(validation.error.details);
      return response.status(400).json({ message: VALIDATION_ERROR, details: validation.error.details });
    }
    
    const { userId, role} = request;
    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }
    // call function to save new rest in SQL
    try {
      const [users, _] = await OwnersModel.addRest(request.body, userId);
      response.status(200).json(users);
    } catch (error) {
      response.status(400).json({ message: SAVE_ERROR, details: error });
      console.log(error);
    }
  };


   // handle update restaurants details
   static async updateRest(request, response) {

    // check that the details inserted its correct
    const validation = OwnersValidations.validUpdateRest(request.body);
    if (validation.error) {
      console.log(validation.error.details);
      return response.status(400).json({ message: VALIDATION_ERROR, details: validation.error.details });
    }
    
    const { userId, role} = request;
    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }
    // call function to save new rest in SQL
    try {
      const [users, _] = await OwnersModel.updateRest(request.body, userId);
      response.status(200).json(users);
    } catch (error) {
      response.status(400).json({ message: SAVE_ERROR, details: error });
      console.log(error);
    }
  };


}

export default OwnersController;

