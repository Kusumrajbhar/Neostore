import mongoose from 'mongoose';

const schemaAddress = new mongoose.Schema({
    customer_id: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    }
})

const Address = mongoose.model<any>("Address", schemaAddress);

export default Address;
