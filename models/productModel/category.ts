import mongoose from 'mongoose';

const schemaCategory = new mongoose.Schema({
    category_name : {
        type : String,
        required : true,
    }
})

const CategoryModel = mongoose.model("Category", schemaCategory);

export default CategoryModel;