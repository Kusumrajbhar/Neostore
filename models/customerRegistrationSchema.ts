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
    OTP: {
        type: String,
    },
})

const Customer = mongoose.model<any>("Customer", registrationSchema);

export default Customer;