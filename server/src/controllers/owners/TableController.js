import TableModel from '../../models/owners/TableModel.js';

const SAVE_ERROR = "Failed to save table";

class TableController {
  constructor() {
  }

  // handle add new menu
  static async addTables(request, response) {

     //   const { role} = request;
  //   if (role !== 'owner') {
  //     return response.status(403).json({ message: "You don't have permission to perform this action." });
  //   }

    const restId = request.body[0].restId;

    const tables = request.body[1];

      try {
      const tables1 = await TableModel.addTables(tables, restId);
      response.status(200).json(tables1);
    } catch (error) {
      response.status(400).json({ message: SAVE_ERROR, details: error });
      console.log(error);
    }
   };

  
 // get all tables details
   static async getTablesDetails(request, response) {

    const { role} = request;
    const restId = request.query.restId;

    // if (role !== 'owner') {
    //   return response.status(403).json({ message: "You don't have permission to perform this action." });
    // }
    
    try {
      const tables = await TableModel.getTablesDetails(restId);
      if (!tables[0]) {
        return response.status(400).json("no tables found");
      }
      response.status(200).json(tables);
    } catch (error) {
      response.status(400).json(error);
      console.log(error);
    }
  };


}

export default TableController;

