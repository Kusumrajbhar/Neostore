import CategoryModel from '../../../models/productModel/category';
import {Request, Response} from 'express';

const postCategory = (req:Request, res:Response) => {
    const productCategory = new CategoryModel({
        category_name : req.body.category_name
    })

    productCategory.save()
    .then((result:any) => {
        console.log('result', result);
        res.status(200).json({success:true, status:200, message:"data Stored successfully"});
    })
    .catch((err:any) => {
        console.log('error', err);
        res.status(400).json({success:false, status:400, message:"data not Stored"});
    })
}

export = {
    postCategory
}