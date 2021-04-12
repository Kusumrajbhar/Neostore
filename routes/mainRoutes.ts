import express from 'express';
import bodyParser from 'body-parser';
import registration from '../controllers/userModule/registration';
import login from '../controllers/userModule/login';
import { register } from 'ts-node';
import changePassword from '../controllers/userModule/changePassword';
import forgotPassword from '../controllers/userModule/forgotPassword';
import recoverForgotPassword from '../controllers/userModule/recoverPassword';
import userProfile from '../controllers/myAccountModule/userProfile';
import upload from '../controllers/userModule/multer';


const router = express.Router();
const app = express();
app.use(bodyParser.json());

//userModule
router.post('/welcome',  registration.getRegistration);    //upload.single('profileImage'),
router.post('/login', login.customerLogin);
router.post('/changePassword', changePassword.change);
router.post('/forgotPassword', forgotPassword.forgotPassword);
router.post('/recoverPassword', recoverForgotPassword.recoverForgotPassword);

//userProfile
router.get('/userProfile', userProfile.getUserProfile);

export default router;