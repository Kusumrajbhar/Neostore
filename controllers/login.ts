import express from 'express';
//import client from '../models/database';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Joi, { string } from 'joi';
import Customer from '../models/customerRegistrationSchema';

const app = express();
app.use(express.json());

const schema = Joi.object({
    email: Joi.string().regex(/^[A-Za-z]{3,}[.][a-z]{2,}@[a-z]{2,}[.]{1}[a-z.]{2,}$/).required(),
    password: Joi.string().regex(/^[A-Z a-z 0-9]{3,15}$/).required(),
});

const customerLogin = (req: request , res: response) => {
    try {
        const customerRegistration = new Customer({
            email: req.body.email,
            password: req.body.password,
        })


    }
    catch {

    }
}

// const customer_login = (req: Request, res: Response) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     const validate = schema.validate(req.body);
//   if(validate.error) {
//       res.status(400).json({success: false, message: validate.error.details[0].message, data: []});
//   }
//   client.query('select*from cust_registration where email = $1',[email], (err, result) => {
//       try {

//       }
//       catch {

//       }
//   })  

  

//}

// export = {
//     customer_login
// }