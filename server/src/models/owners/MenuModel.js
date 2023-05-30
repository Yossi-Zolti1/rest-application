import dotenv from 'dotenv';
import MenuDB from "../../../config/models/menus.js";
dotenv.config();

class MenuModel {
  constructor() { }

  static async addMenu(menu) {

    const newMenu = await MenuDB.create({
      name: menu.name,
      image: menu.image,
      restaurant_id: menu.restId
    });
    return newMenu;
  }

  static async updateMenu(menu) {
    
      const updatedMenu = await MenuDB.update(
        { name: menu.name, image: menu.image },
        { where: { id: menu.menuId } }
      );
      return updatedMenu;
  }

  static async deleteMenu(menuId) {
    
    const deletedMenu = await MenuDB.destroy(
      { where: { id: menuId } }
    );
    return deletedMenu;
}

  // get details of all menus
  static async getMenusDetails(restId) {

    const menus = await MenuDB.findAll({
      where: { restaurant_id: restId }
    });
    return menus;
  }

   // get details of single menu
   static async getMenusDetails(menuId) {

    const menu = await MenuDB.findOne({
      where: { id: menuId }
    });
    return menu;
  }

}
export default MenuModel;