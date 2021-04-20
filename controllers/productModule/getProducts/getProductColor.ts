import ProductColor from '../../../models/productModel/colorModel';
import {Request, Response} from 'express';

const getColorOfProduct = (req:Request, res:Response) => {
    let productColor_id = req.params.id;
    ProductColor.findOne({_id: productColor_id})
    .then((result:any) => {
        console.log('result', result);
        res.status(200).json({success:true, status:200, message:"Requested Color Set", category: result});
        })
        .catch((err:any) => {
        console.log('error', err);
        res.status(400).json({success:false, status:400, message:"Something wrong", error: err});
        })
}

export = {
    getColorOfProduct
}