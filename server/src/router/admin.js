import express from 'express'
const router = express.Router();
import AdminClass from '../../controllers/admin/Admin.js';
import authToken from '../../middleware/authToken.js';


// בקשות API
router.post('/create_rest_manager',authToken, AdminClass.createRestManager);

export default router;