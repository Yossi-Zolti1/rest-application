import express from 'express'
const router = express.Router();
import OwnersClass from '../../controllers/owners/Owners.js';
import authToken from '../../middleware/authToken.js';


// בקשות API
 router.get('/rest-details',authToken, OwnersClass.getRestDetails);

export default router;