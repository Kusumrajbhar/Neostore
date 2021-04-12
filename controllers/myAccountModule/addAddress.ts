import express from 'express';
import { Request, Response } from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import Address from '../../models/addressSchema';

const app = express();
app.use(express.json());

const schema = Joi.object({
    address: Joi.string().required(),
    pincode: Joi.string().regex(/^[0-9]{1,}$/).required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
})

const address = (req: Request, res: Response) => {

    jwt.verify(req.headers.authorization, "mynameiskusumrajbhar", (err: any, authOutput: any) => {
        if (err) {
            console.error(err);
            res.status(400).json({ success: false, message: "invalid token", data: '' });
        }
        else {
            let id1 = authOutput.id;
            const validate = schema.validate(req.body);
            if (validate.error) {
                res.status(400).json({ success: false, message: validate.error.details[0].message, data: [] });
            }
            else {
                const customerAddress = new Address({
                    customer_id: authOutput.id,
                    address: req.body.address,
                    pincode: req.body.pincode,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                })
            
                Address.create(customerAddress, (err, addressResult) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json({ success: false, message: 'Customer Address not registered', data: err.message });
                    }
                    else {
                        console.log('registered', addressResult);
                        res.status(200).json({ success: true, status_code: 200, message: 'Customer Address registered successfully' })
                    }
                })
            }


        }
    })    

}

export = {
    address
}