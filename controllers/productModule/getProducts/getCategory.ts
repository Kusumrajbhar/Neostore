import CategoryModel from '../../../models/productModel/category';
import {Request, Response} from 'express';

const getProductCategory = (req:Request, res:Response) => {
    let category_id = req.params.id;              //if use parseInt this id will converted into '6079'
    console.log('category_id', category_id);
    CategoryModel.findOne({_id: category_id})
    .then((result:any) => {
    console.log('result', result);
    res.status(200).json({success:true, status:200, message:"Requested Category", category: result});
    })
    .catch((err:any) => {
    console.log('error', err);
    res.status(400).json({success:false, status:400, message:"Something wrong", error: err});
    })
}

export = {
    getProductCategory
}