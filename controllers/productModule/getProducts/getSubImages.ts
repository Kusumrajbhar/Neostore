import SubImageModel from '../../../models/productModel/subImages';
import {Request, Response} from 'express';

const getProductSubImages = (req:Request, res:Response) => {
    let subImage_id = req.params.id;
    SubImageModel.findOne({_id: subImage_id})
    .then((result:any) => {
        console.log('result', result);
        res.status(200).json({success:true, status:200, message:"Requested SubImages", category: result});
        })
        .catch((err:any) => {
        console.log('error', err);
        res.status(400).json({success:false, status:400, message:"Something wrong", error: err});
        })

}

export = {
    getProductSubImages
}