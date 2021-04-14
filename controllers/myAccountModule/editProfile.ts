import express from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Customer from '../../models/customerRegistrationSchema';

const app = express();
app.use(express.json());


const getEditProfile = (req: Request, res: Response) => {
    let firstName = req.body.first_name;
    let lastName = req.body.last_name;
    let email = req.body.email;
    let phoneNumber = req.body.phone_number;
    let gender = req.body.gender;
    let DOB = req.body.dob;

    jwt.verify(req.headers.authorization, "mynameiskusumrajbhar", (err: any, authOutput: any) => {
        if (err) {
            console.error(err);
            res.status(400).json({ success: false, message: "invalid token", data: '' });
        }
        else {
            const customerId = authOutput.id;
            Customer.findOne({ _id: customerId },{_id: 0, __v: 0})
            .then(result => {
               // console.log('result', result);
                if (result) {
                    console.log('userProfile', result);
                    Customer.findOneAndUpdate(
                        { _id: customerId },
                        { $set: { firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber, gender: gender, DOB: DOB, updatedAt: new Date()} })
                        .then(output => {
                            if (output) {
                                console.log('updated profile', output);
                                res.status(200).json({ success: true, status: 200, message: 'User Profile Updated Successfully' });
                            }
                            else {
                                console.log('User Profile not Updated');
                                res.status(400).json({ success: false, status: 400, message: 'User Profile not Updated' });
                            }
                        })
                }
                else {
                    console.log('No data found');
                    return res.status(400).json({ success: false, status: 400, message: "No data found" });
                }

            }

            )
        
        }
    });
}

export = {
    getEditProfile
}




    