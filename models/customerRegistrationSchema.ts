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
        type: String,     //Boolean
        required: true,
    },
    OTP: {
        type: Number,
    },
    DOB: {
        type: String,
        required: true,
    },
    profileImage: {
        type: Buffer,
        required: true,

    }
})

const Customer = mongoose.model<any>("Customer", registrationSchema);

export default Customer;