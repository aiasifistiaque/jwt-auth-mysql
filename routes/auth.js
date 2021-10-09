import express from 'express';
import sendOtp from '../controllers/sendOtp.js';
import verifyOtp from '../controllers/verifyOtp.js';
import resetPassword from '../controllers/resetPassword.js';
import login from '../controllers/login.js';
import register from '../controllers/register.js';
import { protect } from '../middleware/auth.js';
import logout from '../controllers/logout.js';
import refresh from '../controllers/refresh.js';
import changePassword from '../controllers/changePassword.js';

const router = express.Router();

router.post('/register', register);
router.get('/logout', protect, logout);
router.post('/login', login);
router.post('/sendotp', sendOtp);
router.post('/verifyotp', verifyOtp);
router.post('/resetpassword', resetPassword);
router.post('/changepassword', protect, changePassword);
router.post('/refresh', refresh);

export default router;
