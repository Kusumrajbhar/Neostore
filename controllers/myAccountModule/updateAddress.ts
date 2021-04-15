import express from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Address from '../../models/customerModel/addressSchema';

const app = express();
app.use(express.json());

const updateCustomerAddress = (req: Request, res: Response) => {
    let address = req.body.address;
    let pincode = req.body.pincode;
    let city = req.body.city;
    let state = req.body.state;
    let country = req.body.country;
    jwt.verify(req.headers.authorization, "mynameiskusumrajbhar", (err: any, authOutput: any) => {
        if (err) {
            console.error(err);
            res.status(400).json({ success: false, message: "invalid token", data: '' });
        }
        else {
            const customerId = authOutput.id;
            Address.findOne({ customer_id: customerId }, (err: any, result: any) => {
                if (err) {
                    console.log('No data found');
                    return res.status(400).json({ success: false, status: 400, message: "No data found" });
                }
                else {
                    console.log('customerAddress', result);
                    Address.findOneAndUpdate(
                        { customer_id: customerId },
                        { $set: { address: address, pincode: pincode, city: city, state: state, country: country, updatedAt: new Date()} })
                        .then(output => {
                            if (output) {
                                console.log('updated Address', output);
                                res.status(200).json({ success: true, status: 200, message: 'Customer Address Updated Successfully', Customer_address: output });
                            }
                            else {
                                console.log('Customer Address not Updated');
                                res.status(400).json({ success: false, status: 400, message: 'Customer Address not Updated' });
                            }
                        })
                }
            });
        }
    })
}

export = {
    updateCustomerAddress
}