import mongoose from 'mongoose';

const schemaProduct = new mongoose.Schema({
    caregory_id : {
        type: Number,
        ref: 'postCategory',
    },
    color_id: {
        type: Number,
        ref: 'postColor',
    },
    product_name: {
       type: String,
       required: true,
    },
    product_image: {
        type: String,
        required: true,
    },
    product_cost: {
        type: Number,
        required: true,
    },
    product_producer: {
        type: String,
        required: true,
    },
    product_material: {
        type: String,
        required: true,
    },
})

const productModel = mongoose.model("ProductList", schemaProduct);

export default productModel;