import CategoryModel from '../../../models/productModel/category';
import {Request, Response} from 'express';

const getAllCategory = (req:Request, res:Response) => {
  CategoryModel.find({})
  .then((result:any) => {
    console.log('result', result);
    res.status(200).json({success:true, status:200, message:"All the Category", category: result});
  })
  .catch((err:any) => {
    console.log('error', err);
    res.status(400).json({success:false, status:400, message:"Something wrong", error: err});
  })
}

export = {
    getAllCategory
}