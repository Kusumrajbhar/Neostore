import express from 'express';
//import client from '../models/database';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Joi, { string } from 'joi';
import bcrypt from 'bcrypt';
import sendEmail from './sendMail-configfile';
import mongoose from 'mongoose';
import validator from 'validator';
//import { register_1 } from '../models/schemaMongo';

const uuid = uuidv4();

const app = express();
app.use(express.json());

//schema for registration
const schema = Joi.object({
    first_name: Joi.string().regex(/^[a-z A-Z]{2,20}$/).required(),
    last_name: Joi.string().regex(/^[a-z A-Z]{2,20}$/).required(),
    email: Joi.string().regex(/^[A-Za-z]{3,}[.][a-z]{2,}@[a-z]{2,}[.]{1}[a-z.]{2,}$/).required(),
    password: Joi.string().regex(/^[A-Z a-z 0-9]{3,15}$/).required(),
    phone_number: Joi.number().min(10).required(),
    gender: Joi.string().regex(/^[a-zA-Z]{4,}$/).required(),
});


const registrationSchema = new mongoose.Schema({
    first_name: {
        type: string,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone_number: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
})

const Customer = mongoose.model("Customer", registrationSchema);

//registration of customer
const getRegistration = async (req: Request, res: Response) => {

    try {
        const validate = schema.validate(req.body);
        if (validate.error) {
            res.status(400).json({ success: false, message: validate.error.details[0].message, data: [] });
        }
        let cust_password = req.body.password;

        //hashing of password
        const password = await bcrypt.hash(cust_password, 10);
        console.log('bcrypt password', password);

        const cus_registration = new Customer({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: password,
            phone_number: req.body.phone_number,
            gender: req.body.gender,
        })

        const result = await cus_registration.save();
        console.log('registered', result);
        res.status(200).json({ success: true, message: 'Customer registered successfully', data: result })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ success: false, message: 'Not Registered', data: err.message });
    }
}

export = {
    getRegistration
}




//schema for registration
// const schema = Joi.object({
//     first_name: Joi.string().regex(/^[a-z A-Z]{2,20}$/).required(),
//     last_name: Joi.string().regex(/^[a-z A-Z]{2,20}$/).required(),
//     email: Joi.string().regex(/^[A-Za-z]{3,}[.][a-z]{2,}@[a-z]{2,}[.]{1}[a-z.]{2,}$/).required(),
//     password: Joi.string().regex(/^[A-Z a-z 0-9]{3,15}$/).required(),
//     phone_number: Joi.number().min(10).required(),
//     gender: Joi.string().regex(/^[a-zA-Z]{4,}$/).required(),
// });

// const customer_registration = async(req: Request, res: Response) => {
//     const first_name = req.body.first_name;
//     const last_name = req.body.last_name;
//     const cust_password = req.body.password;
//     const email = req.body.email;
//     const phone_number = req.body.phone_number;
//     const gender = req.body.gender;
//    //validation
//   const validate = schema.validate(req.body);
//   if(validate.error) {
//       res.status(400).json({success: false, message: validate.error.details[0].message, data: []});
//   }  

//   //hashing of password
//   const password = await bcrypt.hash(cust_password, 10);
//   console.log('bcrypt password', password);






  //insertion in db
//   client.query('INSERT INTO cust_registration (first_name,last_name,email,password,id,phone_number,gender) values ($1,$2,$3,$4,$5,$6,$7)',[first_name, last_name, email,password,uuid, phone_number, gender],(err,result) => {
//   if (err) {
//       console.error(err);
//       return err;
//   }
//   sendEmail({
//     from: "kusum.rajbhar@neosoftmail.com",
//     to: req.body.email,
//     cc: 'kusum.rajbhar@neosoftmail.com',
//     subject: 'Confirmation',
//     html: 'Thank You For Registering On Neostore'
//   });
//   console.log('registered', result.rows);
//   res.status(200).json({ success: true, message: first_name+ ' ' +last_name +" is Regitered Successfully", data: result.rows});
//   })  
 //}

// export = {  
//     customer_registration
// };