import express from 'express'
const router = express.Router();
import UsersClass from '../../controllers/Users.js';


// בקשות API
router.post('/login', UsersClass.Login);
router.post('/createUser', UsersClass.createUser);

export default router;