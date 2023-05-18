import dotenv from 'dotenv';
import MenuDB from "../../../config/models/menus.js";
dotenv.config();

class MenuModel {
  constructor() { }

  static async addMenu(menu) {

    const newMenu = await MenuDB.create({
      name: menu.name,
      restaurant_id: menu.restId
    });
    return newMenu;
  }

  static async updateMenu(menu) {

    const updatedMenu = await MenuDB.update(
      { name: menu.name },
      { where: { id: menu.menuId } }
    );
    return updatedMenu;
  }

  // get details of all menus
    static async getMenusDetails(restId) {

      const menus = await MenuDB.findAll({
        where: { restaurant_id: restId }
      });
      return menus;
    }


}
export default MenuModel;