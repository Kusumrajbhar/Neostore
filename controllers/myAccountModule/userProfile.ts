import express from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Customer from '../../models/customerRegistrationSchema';

const app = express();
app.use(express.json());

const getUserProfile = (req: Request, res: Response) => {
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
                    let userProfile = {firstName: result.firstName, lastName: result.lastName, email: result.email, phoneNumber: result.phoneNumber, gender: result.gender, DOB: result.DOB};
                    return res.status(200).json({ success: true, status: 200, Customer_Profile: userProfile});
                }
            })
        }
    })
}

export = {
    getUserProfile
}

// Customer.findOne({
//     attributes: {
//         include: [
//             "firstName",
//             "lastName",
//             "email",
//             "phoneNumber",
//             "gender",
//             "DOB"
//         ],
//         exclude: ["_id"]
//     },
//     where: { _id: customerId }
// })
// .then((result) => {
//     if(result) {
//         return res.status(200).json({ success: true, status: 200, Customer_Profile: result}); 
//     }
//     else {
//         return res.status(400).json({ success: false, status: 400, message: "No data found" });  
//     };
// });