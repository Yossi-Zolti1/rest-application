// import MenuModel from '../../models/owners/MenuModel.js';
// import UploadImageController from '../owners/UploadImageController.js';

const SAVE_ERROR = "Failed to save table";

class TableController {
  constructor() {
  }

  // handle add new menu
  static async addTables(request, response) {


    console.log(request.body[0]);
    console.log(request.body[1]);
    console.log(request.body[1]);
    console.log(typeof(request.body[1][0].position.x)  );

    response.status(200).json("success");

  //   const { role} = request;
  //   if (role !== 'owner') {
  //     return response.status(403).json({ message: "You don't have permission to perform this action." });
  //   }

  //   if (request.files) {
  //     // If file is present in the request, direct to upload controller
  //     const link = await UploadImageController.uploadImage(request, response, "menus");
  //     if (!link.link1) {
  //       return response.status(405).json({ msg: `Error: Upload file failed` });
  //     }
  //     request.body.image = link.link1;
  //   }

  //   // call function to save new menu in SQL
  //   try {
  //     const menu = await MenuModel.addMenu(request.body);
  //     response.status(200).json(menu);
  //   } catch (error) {
  //     response.status(400).json({ message: SAVE_ERROR, details: error });
  //     console.log(error);
  //   }
   };

  



}

export default TableController;

