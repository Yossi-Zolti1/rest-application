import express from 'express'
const router = express.Router();
import RestaurantClass from '../controllers/owners/ResturantController.js';
import MenuClass from '../controllers/owners/MenuController.js';
import DepartmentClass from '../controllers/owners/DepartmentController.js';
 import ItemClass from '../controllers/owners/ItemController.js';
import UploadClass from '../controllers/owners/UploadLogoController.js';
import authToken from '../middleware/authToken.js';


// API restaurants request handlers
router.post('/add_rest', authToken, RestaurantClass.addRest);
router.get('/rest_details', authToken, RestaurantClass.getRestDetails);
router.put('/update_rest', authToken, RestaurantClass.updateRest);
router.post('/update_logo', authToken, UploadClass.uploadLogo);

// API menu request handlers
router.post('/add_menu', authToken, MenuClass.addMenu);
router.post('/add_department', authToken, DepartmentClass.addDepartment);
 router.post('/add_item', authToken, ItemClass.addItem);

// router.put('/update_menu',authToken, MenuClass.uploadLogo);
// router.put('/update_department',authToken, MenuClass.uploadLogo);
// router.put('/update_item',authToken, MenuClass.uploadLogo);



export default router;