import UsersDB from "../../../config/models/users.js";
import MenuDB from "../../../config/models/menus.js";
import RestDB from "../../../config/models/restaurants.js";
import DepartmentDB from "../../../config/models/departments.js";
import ItemDB from "../../../config/models/items.js";
// import { Op } from 'sequelize';
import Fuse from "fuse.js";


class CustomersModel {
  constructor() { }

  // handle create user
  static async save(newData) {

    const newUser = await UsersDB.create({
      name: newData.name,
      phone: newData.phone,
      email: newData.email,
      password: newData.password,
      role: 'user'
    });
    return newUser;
  }

  // get all resrs
  static async getRestsDetails(currentPage, pagesSize) {

    // var currentPage rised only 1 every loading and the offset calculate the position
    const offset = (currentPage - 1) * pagesSize;

    const restaurants = await RestDB.findAll({
      limit: pagesSize,
      offset: offset
    });

    return restaurants;
  }

  // get search rest by name
  // static async getRestByName(nameInserted) {

  //   const restaurants = await RestDB.findAll({
  //     where: {
  //       [Op.or]: [
  //         { name: nameInserted },
  //         { name: { [Op.like]: `%${nameInserted}%` } }
  //       ]
  //     }
  //   });

  //   return restaurants;
  // }


  // get search rest by name
  static async getRestByName(nameInserted) {

    const restaurants = await RestDB.findAll();

    const fuse = new Fuse(restaurants, { keys: ['name'] });
    const results = fuse.search(nameInserted);
    const matchedRestaurants = results.map((result) => result.item);

    return matchedRestaurants;
  }


  static async getMenusDetails(restId) {
   
    const menus = await RestDB.findOne({
      where: { id: restId },
      include: [
        {
          model: MenuDB,
          include: [
            {
              model: DepartmentDB,
              include: [ItemDB]
            }
          ]
        }
      ]
    })
    return menus;
  }

}
export default CustomersModel;