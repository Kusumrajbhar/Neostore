import express from 'express';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Joi, { string } from 'joi';
import Customer from '../models/customerRegistrationSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

const schema = Joi.object({
    email: Joi.string().regex(/^[A-Za-z]{3,}[.][a-z]{2,}@[a-z]{2,}[.]{1}[a-z.]{2,}$/).required(),
    password: Joi.string().regex(/^[A-Z a-z 0-9]{3,15}$/).required(),
});

const customerLogin = (req: Request, res: Response) => {
    try {
        const loginEmail = req.body.email;
        const loginPassword = req.body.password;

        Customer.findOne({ email: loginEmail }, (err, result) => {                  //findOne to get one document
            console.log('result', result);
            const validate = schema.validate(req.body);
            if (validate.error) {
                res.status(400).json({ success: false, message: validate.error.details[0].message, data: [] });
            }
            bcrypt.compare(loginPassword, result.password, (err, matchedData) => {
                if (err) {
                    console.log(" wrong password");
                    res.status(400).json({ message: 'enter correct password' });
                }
                else
                    if (matchedData) {
                        console.log('logged In successfully', matchedData);
                        const token = jwt.sign({ id: result.id, email: result.email }, "mynameiskusumrajbhar");
                        console.log("token : ", token);
                       // let text = 'result';
                        let objResult = JSON.parse('result'); 
                       // let objResult = Object.entries(result);
                        console.log('objResult', objResult)
                        let responseObject = objResult;
                        responseObject["token"] = token;
                        delete responseObject["password"];
                        delete responseObject["id"]; 
                        res.status(200).json({success: true, status: 200, message: 'logged in successfully', Customer_Details: responseObject});
                    }
                    else {
                        res.status(400).json({success: false, status: 400, message: "Please enter correct password"})
                    }
            })

        })

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ success: false, message: 'Not Registered User', data: err.message });
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

export = {
    customerLogin
}