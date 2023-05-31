import CustomersModel from '../../models/customers/CustomersModel.js';

const SAVE_ERROR = "Failed to save user";

class CustomersController {
  constructor() {
  }

  // code 1 part 1
  static async createUser(request, response) {
    const { email, phone, name, password } = request.body;
    const userData = { email, phone, name, password };

      try {
        const user = await CustomersModel.save(userData);
        response.status(200).json(user.id);
      } catch (error) {
        console.log(error);
        response.status(400).json({ message: SAVE_ERROR, details: error });
      }
    
  }

   // get all retaurants details
   static async getRestsDetails(request, response) {

    const currentPage = request.query.currentPage;

    try {
      const restaurants = await CustomersModel.getRestsDetails(currentPage, 3);
      if (!restaurants[0]) {
        return response.status(400).json("no rest found");
      }
       response.status(200).json(restaurants);
    } catch (error) {
      response.status(400).json(error);
      console.log(error);
    }
  };

   // get rest details by name
   static async getRestByName(request, response) {

    const nameInserted = request.query.nameInserted;

    try {
      const restaurant = await CustomersModel.getRestByName(nameInserted);
      if (!restaurant[0]) {
        return response.status(400).json("no rest found");
      }
       response.status(200).json(restaurant);
    } catch (error) {
      response.status(400).json(error);
      console.log(error);
    }
  };

}

export default CustomersController;

