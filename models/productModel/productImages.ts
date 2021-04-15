import mongoose from 'mongoose';

const schemaProductImages = new mongoose.Schema({
    category_name : {
        type : String
    },
    product_image : {
        type : String
    },
})

const ProductImages = mongoose.model<any>("ProductImages", schemaProductImages);

export default ProductImages;