import express from 'express';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import sendEmail from './sendMail-configfile';
import Customer from '../../models/customerRegistrationSchema';


const app = express();
app.use(express.json());

//schema for registration
const schemaJoi = Joi.object({
    first_name: Joi.string().regex(/^[a-z A-Z]{2,20}$/).required(),
    last_name: Joi.string().regex(/^[a-z A-Z]{2,20}$/).required(),
    email: Joi.string().regex(/^[A-Za-z]{3,}[.][a-z]{2,}@[a-z]{2,}[.]{1}[a-z.]{2,}$/).required(),
    password: Joi.string().regex(/^[A-Z a-z 0-9]{3,15}$/).required(),
    phone_number: Joi.number().min(10).required(),
    //gender: Joi.boolean().valid(1,0).required(),
    dob: Joi.string().required(),
    gender: Joi.string().regex(/^[a-zA-Z]{4,}$/).required(),
});


//registration of customer
const getRegistration = async (req: Request, res: Response) => {

    try {
        const validate = schemaJoi.validate(req.body);
        if (validate.error) {
            res.status(400).json({ success: false, message: validate.error.details[0].message, data: [] });
        }
        let customerPassword = req.body.password;

        //hashing of password
        const hashedPassword = await bcrypt.hash(customerPassword, 10);
        console.log('bcrypt password', hashedPassword);

        const customerRegistration = new Customer({
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            password: hashedPassword,
            phoneNumber: req.body.phone_number,
            gender: req.body.gender,
            DOB: req.body.dob,
            profileImage: req.file.filename,
        })

        //const result = await customerRegistration.save();
        Customer.create(customerRegistration,(err, customer) => {
            if (err) {
                console.log(err);
                res.status(400).json({ success: false, message: 'Not Registered', data: err.message });
            }
            else {
                // sendEmail({
                //     from: "kusum.rajbhar@neosoftmail.com",
                //     to: req.body.email,
                //     cc: 'kusum.rajbhar@neosoftmail.com',
                //     subject: 'Confirmation',
                //     html: 'Thank You For Registering On Neostore'
                // });
                console.log('registered', customer);
                res.status(200).json({ success: true, status_code : 200, message: customer.firstName + ' ' + customer.lastName + ' ' +'registered successfully' })
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ success: false, message: 'Not Registered', data: err.message });
    }
}

export = {
    getRegistration
}


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