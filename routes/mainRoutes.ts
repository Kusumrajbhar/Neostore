import express from 'express';
import bodyParser from 'body-parser';
import registration from '../controllers/registration';
import login from '../controllers/login';
import { register } from 'ts-node';

const router = express.Router();
const app = express();
app.use(bodyParser.json());

router.post('/welcome', registration.customer_registration);

router.post('/login', login.customer_login)

export default router;