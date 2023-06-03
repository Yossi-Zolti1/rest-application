import dotenv from 'dotenv';
import TableDB from "../../../config/models/tables.js";
dotenv.config();

class TableModel {
  constructor() { }

  static async addTables(tables, restId) {

    const createdTables = [];
  
  for (const table of tables) {
   
    const newTable = await TableDB.create({
      name: table.name,
      positionX: table.position.x,
      positionY: table.position.y,
      restaurant_id: restId
    });

    createdTables.push(newTable);
  } 
    return createdTables;
  }

    // get details of all tables
    static async getTablesDetails(restId) {

        const tables = await TableDB.findAll({
          where: { restaurant_id: restId }
        });
        return tables;
      }

  
}
export default TableModel;