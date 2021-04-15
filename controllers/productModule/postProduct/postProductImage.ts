import ProductImages from '../../../models/productModel/productImages';
import {Request, Response} from 'express';

const postProductImages = (req:Request, res:Response) => {
    const newCategory = new ProductImages ({
        category_name : req.body.category_name,
        product_image : req.file.filename
    })
    newCategory.save()
    .then((result:any) => {
       console.log('file', req.file.filename);
        console.log('result', result);
        res.status(200).json({success:true, status:200, message:"data Stored successfully"});
    })
    .catch((err:any) => {
        console.log('error', err);
        res.status(400).json({success:false, status:400, message:"data not Stored"});
    })
}

export = {
    postProductImages
};