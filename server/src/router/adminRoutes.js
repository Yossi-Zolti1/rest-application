import express from 'express'
const router = express.Router();
import AdminClass from '../controllers/admins/AdminsController.js';
import authToken from '../middleware/authToken.js';


// בקשות API
router.post('/create_rest_owner',authToken, AdminClass.createRestManager);

export default router;