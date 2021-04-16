import mongoose from 'mongoose';

const schemaSubImages = new mongoose.Schema({
    subImages : {
        type : [{type:String}],
        required:true,
    },
})

const SubImageModel = mongoose.model('SubImages', schemaSubImages);

export default SubImageModel;