import express from 'express';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Joi, { string } from 'joi';
import Customer from '../../models/customerRegistrationSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

const schema = Joi.object({
    email: Joi.string().regex(/^[A-Za-z]{3,}[.][a-z]{2,}@[a-z]{2,}[.]{1}[a-z.]{2,}$/).required(),
    password: Joi.string().regex(/^[A-Z a-z 0-9]{3,15}$/).required(),
});

const customerLogin = async (req: Request, res: Response) => {
    try {
        const loginEmail = req.body.email;
        const loginPassword = req.body.password;

        Customer.findOne({ email: loginEmail }, (err, result) => {                  //findOne to get one document
            console.log('result', result);
            const validate = schema.validate(req.body);
            if (validate.error) {
                res.status(400).json({ success: false, message: validate.error.details[0].message, data: [] });
            }
            return bcrypt.compare(loginPassword, result.password, (err, matchedData) => {
                if (err) {
                    console.log(" wrong password");
                    return res.status(400).json({ message: 'enter correct password' });
                }
                else
                    if (matchedData) {
                        console.log('logged In successfully', matchedData);
                        const token = jwt.sign({ id: result._id, email: result.email }, "mynameiskusumrajbhar");
                        console.log("token : ", token);
                        
                        let objResult = result.password;
                        console.log('objResult', objResult)

                        let responseObject = {firstName: result.firstName, lastName: result.lastName, email: result.email, phoneNumber: result.phoneNumber, gender: result.gender}
                       
                        console.log('res1',responseObject);
                            return res.status(200).json({ success: true, status: 200, message: 'logged in successfully', customerDetails: responseObject, token: token });
                        
                    }
                    else {
                        return res.status(400).json({ success: false, status: 400, message: "Please enter correct password" })
                    }
            })

        })

    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: 'Not Registered User', data: err.message });
    }
}

export = {
    customerLogin
}