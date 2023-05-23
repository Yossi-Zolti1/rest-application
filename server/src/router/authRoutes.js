import express from 'express'
import AuthController from '../../src/controllers/AuthController.js';
import authToken from '../../src/middleware/authToken.js';
const router = express.Router();

// בקשות API
router.post('/login', AuthController.Login);
router.post('/forgotPassword', AuthController.forgotPassword);
router.put('/resetPassword', authToken, AuthController.resetPassword);
router.post('/checkAuth',authToken, (req,res)=>{
    res.status(200).json(req.userId);
});
export default router;