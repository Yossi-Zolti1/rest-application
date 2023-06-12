import express from 'express'
const router = express.Router();
import CustomersClass from '../controllers/customers/CustomersController.js';
import OrdersClass from '../controllers/customers/OrderController.js';


// בקשות API
router.post('/createUser', CustomersClass.createUser);
router.get('/rests_details', CustomersClass.getRestsDetails);
router.get('/rest_details_by_name', CustomersClass.getRestByName);
router.get('/menus_details', CustomersClass.getMenusDetails);

router.post('/get_payment', OrdersClass.paymentSuccess);
router.post('/save_order', OrdersClass.createOrder);

export default router;