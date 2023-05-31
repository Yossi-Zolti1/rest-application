import express from 'express'
const router = express.Router();
import CustomersClass from '../controllers/customers/CustomersController.js';


// בקשות API
router.post('/createUser', CustomersClass.createUser);
router.get('/rests_details', CustomersClass.getRestsDetails);
router.get('/rest_details_by_name', CustomersClass.getRestByName);

export default router;