import express from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Customer from '../../models/customerRegistrationSchema';

const app = express();
app.use(express.json());

const getEditProfile = (req: Request, res: Response) => {
    jwt.verify(req.headers.authorization, "mynameiskusumrajbhar", (err: any, authOutput: any) => {
        if (err) {
            console.error(err);
            res.status(400).json({ success: false, message: "invalid token", data: '' });
        }
        else {
            const customerId = authOutput.id;
            Customer.findOne({ _id: customerId }, (err: any, result: any) => {
                if (err) {
                    console.log('No data found');
                    return res.status(400).json({ success: false, status: 400, message: "No data found" });
                }
                else {
                    console.log('userProfile', result);
                    

                }
            });
        }
    });


}