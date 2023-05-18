import RestaurantModel from '../../models/owners/RestaurantModel.js';
import UploadLogoController from './UploadLogoController.js';

const SAVE_ERROR = "Failed to save rest";

class ResturantController {
  constructor() {
  }

  // get retaurant details
  static async getRestDetails(request, response) {
    const { userId, role } = request;
    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }

    try {
      const restaurant = await RestaurantModel.getRestDetails(userId);
      if (!restaurant) {
        return response.status(400).json("no rest found");
      }
      response.status(200).json(restaurant);
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

    const { userId, role } = request;
    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }
    // call function to save new rest in SQL
    try {
      const restaurant = await RestaurantModel.addRest(request.body, userId);
      response.status(200).json(restaurant);
    } catch (error) {
      response.status(400).json({ message: SAVE_ERROR, details: error });
      console.log(error);
    }
  };


  // handle update restaurants details
  static async updateRest(request, response) {

    const { userId, role } = request;
    if (role !== 'owner') {
      return response.status(403).json({ message: "You don't have permission to perform this action." });
    }
    // call function to save new rest in SQL
    try {
      const restaurant = await RestaurantModel.updateRest(request.body, userId);
      response.status(200).json(restaurant);
    } catch (error) {
      response.status(400).json({ message: SAVE_ERROR, details: error });
      console.log(error);
    }
  };


}

export default ResturantController;

