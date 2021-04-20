import ProductModel from '../../../models/productModel/productModel';
import {Request, Response} from 'express';

const postProduct = (req:Request,res:Response) => {
    const postProductList = new ProductModel({
        category_id :req.body.category_id,
        color_id:req.body.color_id,
        subImages_id:req.body.subImages_id,
        product_name:req.body.product_name,
        product_image:req.file.filename,
        product_cost:req.body.product_cost,
        product_producer:req.body.product_producer,
        product_stock:req.body.product_stock,
        product_diamension:req.body.product_diamension,
        product_material:req.body.product_material,
        product_rating:req.body.product_rating,
    })
    postProductList.save()
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
    postProduct
}
