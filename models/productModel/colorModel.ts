import mongoose from 'mongoose';

const schemaProductColor = new mongoose.Schema({
    color_name : {
        type : String,
        required : true,
    },
    color_code : {
        type : String,
        required : true,
    }
})


const ProductColor = mongoose.model<any>("ProductColor", schemaProductColor);

export default ProductColor;