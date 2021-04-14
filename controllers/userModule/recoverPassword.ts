import express from 'express';
import { Request, Response } from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import Customer from '../../models/customerRegistrationSchema';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());

const schema = Joi.object({
    otp: Joi.string().regex(/^[0-9]{1,}$/).required(),
    newPassword: Joi.string().regex(/^[A-Z a-z 0-9]{3,15}$/).required(),
    confirmPassword: Joi.string().equal(Joi.ref("newPassword")).required(),
});

const recoverForgotPassword = async (req: Request, res: Response) => {
    try {
        let otp = req.body.otp;
        let newPassword = req.body.newPassword;
        jwt.verify(req.headers.authorization, "mynameiskusumrajbhar", (err: any, authOutput: any) => {
            let customerId = authOutput.id;
            if (err) {
                console.error(err);
                res.status(400).json({ success: false, message: "invalid token", data: '' });
            }
            else {
                const validate = schema.validate(req.body);
                if (validate.error) {
                    res.status(400).json({ success: false, message: validate.error.details[0].message, data: [] });
                } else
                    if (authOutput) {
                        Customer.findOne({ _id: customerId }, async (err: any, result: any) => {
                            //console.log('result otp', result);
                            if (err) {
                                console.log('Customer Id is wrong');
                                res.status(400).json({ success: false, status: 400, message: "Email Id is not matching with registered customer Email Id" });
                            } else
                                if (otp == result.OTP) {
                                    const hashedPassword = await bcrypt.hash(newPassword, 10);
                                    console.log('hashed password', hashedPassword);
                                    Customer.updateOne(
                                        { _id: customerId },
                                        { $set: { password: hashedPassword } })
                                        .then(result => {
                                            if (result) {
                                                console.log('updated');
                                                res.status(200).json({ success: true, status: 200, message: 'Password changed Successfully' });
                                            }
                                            else {
                                                console.log('password not changed');
                                                res.status(400).json({ success: false, status: 400, message: 'Password not changed' });
                                            }
                                        }
                                        )
                                }
                            else {
                                res.status(400).json({ success: false, status: 400, message: "Please enter correct otp" });
                            }
                        })
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
    recoverForgotPassword
}