import express from 'express'
const router = express.Router();
import OwnersClass from '../../controllers/owners/Owners.js';
import UploadClass from '../../controllers/UploadFiles.js';
import authToken from '../../middleware/authToken.js';


// בקשות API
 router.post('/rest_details',authToken, OwnersClass.getRestDetails);
 router.post('/add_rest',authToken, OwnersClass.addRest);
 router.post('/upload_logo',authToken, UploadClass.uploadLogo);

export default router;