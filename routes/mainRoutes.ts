import express from 'express';
import bodyParser from 'body-parser';
import registration from '../controllers/userModule/registration';
import login from '../controllers/userModule/login';
import { register } from 'ts-node';
import changePassword from '../controllers/userModule/changePassword';
import forgotPassword from '../controllers/userModule/forgotPassword';
import recoverForgotPassword from '../controllers/userModule/recoverPassword';
import userProfile from '../controllers/myAccountModule/userProfile';
import editProfile from '../controllers/myAccountModule/editProfile';
import addAddress from '../controllers/myAccountModule/addAddress';
import getAddress from '../controllers/myAccountModule/getAddress';
import updateAddress from '../controllers/myAccountModule/updateAddress';
import upload from '../controllers/userModule/multer';


const router = express.Router();
const app = express();
app.use(bodyParser.json());

//userModule
router.post('/welcome',upload.single('profileImage'), registration.getRegistration);    //upload.single('profileImage'),
router.post('/login', login.customerLogin);
router.post('/changePassword', changePassword.change);
router.post('/forgotPassword', forgotPassword.forgotPassword);
router.post('/recoverPassword', recoverForgotPassword.recoverForgotPassword);

//userProfile
router.get('/userProfile', userProfile.getUserProfile);
router.post('/editProfile', editProfile.getEditProfile);
router.post('/addAddress', addAddress.address);
router.get('/getAddress', getAddress.getCustomerAddress);
router.post('/updateAddress', updateAddress.updateCustomerAddress);

export default router;