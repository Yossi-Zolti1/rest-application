import express from 'express'
const router = express.Router();
import OwnersClass from '../../controllers/owners/Owners.js';
import authToken from '../../middleware/authToken.js';


// בקשות API
 router.get('/rest_details',authToken, OwnersClass.getRestDetails);
 router.get('/add_rest',authToken, OwnersClass.addRest);

export default router;