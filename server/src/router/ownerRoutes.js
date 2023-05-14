import express from 'express'
const router = express.Router();
import OwnersClass from '../controllers/owners/OwnersController.js';
import UploadClass from '../controllers/owners/UploadLogoController.js';
import authToken from '../middleware/authToken.js';


// בקשות API
 router.get('/rest_details',authToken, OwnersClass.getRestDetails);
 router.post('/add_rest',authToken, OwnersClass.addRest);
 router.put('/update_rest',authToken, OwnersClass.updateRest);
 router.post('/update_logo',authToken, UploadClass.uploadLogo);

export default router;