import mongoose from 'mongoose';

const schemaAddress = new mongoose.Schema({
    customer_id: {
        //type: Schema.Types.ObjectId,
        type: String,
        ref: 'Customer',
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
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    }
})

const Address = mongoose.model<any>("Address", schemaAddress);

export default Address;
