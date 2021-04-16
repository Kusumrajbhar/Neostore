import SubImageModel from '../../../models/productModel/subImages';
import {Request, Response} from 'express';

const getAllSubImages = (req:Request, res:Response) => {
    SubImageModel.find()
    .then((result:any) => {
        console.log('result', result);
        res.status(200).json({success:true, status:200, message:"All the subImages", category: result});
    })
    .catch((err:any) => {
        console.log('error', err);
        res.status(400).json({success:false, status:400, message:"Something wrong", error: err});
    })
}

export = {
    getAllSubImages
}