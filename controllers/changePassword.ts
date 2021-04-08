import express from 'express';
import { Request, Response } from 'express';
import Customer from '../models/customerRegistrationSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendEmail from './sendMail-configfile';
import Joi from 'joi';


const app = express();
app.use(express.json());

const schema = Joi.object({
    oldPassword: Joi.string().regex(/^[A-Z a-z 0-9]{3,15}$/).required(),
    newPassword: Joi.string().regex(/^[A-Z a-z 0-9]{3,15}$/).required(),
    confirmPassword: Joi.string().equal(Joi.ref("newPassword")).required(),
    id: Joi.string().required(),
});

const change = (req: Request, res: Response) => {
    try {
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;
        let confirmPassword = req.body.confirmPassword;
        let customerId = req.body.id;
        // jwt.verify(req.headers.authorization,  "mynameiskusumrajbhar", (err: any, authOutput: any) => {
        //     if(err) {
        //         console.error(err);
        //         res.status(400).json({ success: false, message: "invalid token", data: '' });
        //     }
        //     else {

        //     }
        // })
        const validate = schema.validate(req.body);
        if (validate.error) {
            res.status(400).json({ success: false, message: validate.error.details[0].message, data: [] });
        } else {
            Customer.findOne({ _id: customerId }, (err, result) => {
                if (err) {
                    console.log('Customer Id is wrong');
                    res.status(400).json({ success: false, status: 400, message: "Customer Id is not matching with registered customer Id" });
                } else {
                    bcrypt.compare(oldPassword, result.password, async (err, matchedPass) => {
                        if (err) {
                            console.log('matched error', err);
                            res.status(400).json({ success: false, status: 400, message: "Your Password is not matched" });
                        } else
                            if (matchedPass) {
                                const hashedPassword = await bcrypt.hash(newPassword, 10);
                                console.log('hashed password', hashedPassword);
                               
                                Customer.updateOne(
                                    { _id: customerId },
                                    { $set: { password: "hashedPassword" } })
                                // sendEmail({
                                //     from: "kusum.rajbhar@neosoftmail.com",
                                //     to: req.body.email,
                                //     cc: 'kusum.rajbhar@neosoftmail.com',
                                //     subject: 'Confirmation',
                                //     html: 'Thank You For Registering On Neostore'
                                // });
                                res.status(200).json({ success: true, status: 200, message: 'Password changed Successfully' });
                            }
                            else {
                                res.status(400).json({ success: false, status: 400, message: "Please enter correct password" })
                            }

                    })

                }

            })

        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ success: false, message: 'Something Wrong', data: err.message });
    }

}

export = {
    change
}
