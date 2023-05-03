import express from 'express'
const router = express.Router();
import UsersClass from '../../controllers/users/Users.js';
import authToken from '../../middleware/authToken.js';


// בקשות API
router.post('/createUser', UsersClass.createUser);
router.post('/login', UsersClass.Login);

router.post('/forgotPassword', UsersClass.forgotPassword);
router.put('/resetPassword',authToken, UsersClass.resetPassword);

export default router;