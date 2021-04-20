import ProductModel from '../../../models/productModel/productModel';
import {Request, Response} from 'express';

const getAllProductList = (req:Request, res:Response) => {
     ProductModel.find()
     .then((result:any) => {
        console.log('result', result);
        res.status(200).json({success:true, status:200, message:"All the Product List", category: result});
     })
     .catch((err:any) => {
        console.log('error', err);
        res.status(400).json({success:false, status:400, message:"Something wrong", error: err});
     })
}

export = {
    getAllProductList
}