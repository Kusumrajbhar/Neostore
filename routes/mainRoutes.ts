import express from 'express';
import bodyParser from 'body-parser';
import registration from '../controllers/registration';
import login from '../controllers/login';
import { register } from 'ts-node';
import changePassword from '../controllers/changePassword';
import forgotPassword from '../controllers/forgotPassword';
import recoverForgotPassword from '../controllers/recoverPassword';

const router = express.Router();
const app = express();
app.use(bodyParser.json());

router.post('/welcome', registration.getRegistration);

router.post('/login', login.customerLogin);

router.post('/changePassword', changePassword.change);

router.post('/forgotPassword', forgotPassword.forgotPassword);

router.post('/recoverPassword', recoverForgotPassword.recoverForgotPassword);

export default router;