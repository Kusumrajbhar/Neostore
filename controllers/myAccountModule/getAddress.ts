import express from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Address from '../../models/customerModel/addressSchema';


const app = express();
app.use(express.json());

const getCustomerAddress = (req: Request, res: Response) => {
    jwt.verify(req.headers.authorization, "mynameiskusumrajbhar", (err: any, authOutput: any) => {
        if (err) {
            console.error(err);
            res.status(400).json({ success: false, message: "invalid token", data: '' });
        }
        else {
            const customerId = authOutput.id;
            Address.findOne({customer_id: customerId},{_id: 0, __v: 0})
            .then(result => {
                //console.log('result', result);
                if (result) {
                    console.log('userProfile', result);
                 return res.status(200).json({ success: true, status: 200, Customer_address: result });

                }
                else {
                    return res.status(400).json({ success: false, status: 400, message: "No data found" });
                }
            }

            )
        }
    })

}

export = {
    getCustomerAddress
}

 // Address.findOne({ customer_id: customerId }, (err: any, result: any) => {
            //     //console.log('address result', result);
            //     if (err) {
            //         console.log('No data found');
            //         return res.status(400).json({ success: false, status: 400, message: "No data found" });
            //     }
            //     else {
            //         console.log('userProfile', result);
            //         let customerAddress = {address: result.address, pincode: result.pincode, city: result.city, state: result.state, country: result.country };
            //         return res.status(200).json({ success: true, status: 200, Customer_address: result });
            //     }
            // })