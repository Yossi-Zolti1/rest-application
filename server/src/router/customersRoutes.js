import express from 'express'
const router = express.Router();
import UsersClass from '../controllers/customers/CustomersController.js';


// בקשות API
router.post('/createUser', UsersClass.createUser);

export default router;