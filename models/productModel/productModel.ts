import mongoose from 'mongoose';

const schemaProduct = new mongoose.Schema({
    category_id : {
        type: String,
        ref: 'postCategory',
    },
    color_id: {
        type: String,
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
    product_stock: {
       type: String,
       required: true,
    },
    product_diamension: {
       type: String,
       required: true,
    },
    product_material: {
        type: String,
        required: true,
    },
    product_rating: {
        type: String,
        required: true,
    }
})

const ProductModel = mongoose.model("ProductList", schemaProduct);

export default ProductModel;