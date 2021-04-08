import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
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
    phoneNumber: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    // newpassword: {
    //     type: String,
    //     required: true,
    // },
    // confirmPassword: {
    //     type: String,
    //     required: true,
    // }
})

const Customer = mongoose.model<any>("Customer", registrationSchema);

export default Customer;