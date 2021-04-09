import express from 'express';
import { Request, Response } from 'express';
import Joi, { string } from 'joi';
import jwt from 'jsonwebtoken';
import Customer from '../models/customerRegistrationSchema';
import sendEmail from './sendMail-configfile';

const app = express();
app.use(express.json());

const schema = Joi.object({
    email: Joi.string().regex(/^[A-Za-z]{3,}[.][a-z]{2,}@[a-z]{2,}[.]{1}[a-z.]{2,}$/).required(),
});

// function generate(){
//     let num = '1234567890';
//     for(let i=0; i<4; i++){
//         let OTP = num[Math.floor(Math.random()*10)];
//         let otp = num[OTP]
//         console.log('OTP', otp);
//     }
// }
//  generate();
// console.log('otp')

const forgotPassword = (req: Request, res: Response) => {
    try {
        jwt.verify(req.headers.authorization, "mynameiskusumrajbhar", (err: any, authOutput: any) => {
            if (err) {
                console.error(err);
                res.status(400).json({ success: false, message: "invalid token", data: '' });
            }
            else {
                if (authOutput) {
                    // let email = req.body.email;
                    const validate = schema.validate(req.body);
                    if (validate.error) {
                        res.status(400).json({ success: false, message: validate.error.details[0].message, data: [] });
                    } else {
                        Customer.findOne({ email: req.body.email }, (err, result) => {
                            if (err) {
                                console.log('Customer Email Id is not matching');
                                res.status(400).json({ success: false, status: 400, message: err.message });
                            }
                            else {
                                if (result) {
                                    // sendEmail({
                                    //     from: "kusum.rajbhar@neosoftmail.com",
                                    //     to: req.body.email,
                                    //     cc: 'kusum.rajbhar@neosoftmail.com',
                                    //     subject: 'OTP for recovering password',
                                    //     html: ''
                                    // })
                                }
                                else {
                                    res.status(400).json({ success: false, status: 400, message: "Please enter correct Email Id" })
                                }
                            }
                        })
                    }
                }
            }
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ success: false, message: 'Something Wrong', data: err.message });
    }
}

export = {
    forgotPassword
}