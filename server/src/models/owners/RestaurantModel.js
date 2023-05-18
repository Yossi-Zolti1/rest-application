import dotenv from 'dotenv';
import RestDB from "../../../config/models/restaurants.js";
dotenv.config();

class RestaurantModel {
  constructor() { }

  static async getRestDetails(userId) {

    const restaurants = await RestDB.findAll({
      where: { owner_id: userId }
    });
    return restaurants;
  }

  static async addRest(rest, userId) {

    const newRestaurant = await RestDB.create({
      name: rest.name,
      street: rest.street,
      city: rest.city,
      phone: rest.phone,
      kashrut: rest.kashrut,
      type: rest.type,
      logo: rest.logo,
      owner_id: userId
    });
    return newRestaurant;
  }

  static async updateRest(rest, userId) {

    const updatedRestaurant = await RestDB.update(
      {
        name: rest.name,
        street: rest.street,
        city: rest.city,
        phone: rest.phone,
        kashrut: rest.kashrut,
        type: rest.type
      },
      { where: { owner_id: userId } }
    );
    return updatedRestaurant;
  }

  static async updateLogo(logoLink, userId) {

    const updatedRestaurant = await RestDB.update(
      { logo: logoLink },
      { where: { owner_id: userId } }
    );
    return updatedRestaurant;
  }
  
}
export default RestaurantModel;