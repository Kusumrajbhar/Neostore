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
        type: Boolean,
        required: true,
    },
    OTP: {
        type: String,
    },
    DOB: {
        type: String,
        required: true,
    },
    profileImage: {
        type: Buffer,

    }
})

const Customer = mongoose.model<any>("Customer", registrationSchema);

export default Customer;