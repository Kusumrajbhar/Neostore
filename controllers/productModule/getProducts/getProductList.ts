import ProductModel from '../../../models/productModel/productModel';
import {Request, Response} from 'express';

const getProduct_color = (req:Request, res:Response) => {
  let product_id = req.params.id;
  let categoryId = req.params.category_id;
  let colorId = req.params.color_id;
  let subImageId = req.params.subImage_id;
  ProductModel.findOne({_id:product_id, category_id:categoryId, color_id:colorId, subImage_id: subImageId})
    .populate('category_id')
    .populate('color_id')
    .populate('subImages_id')
    .exec((err:any,result:any)=>{
        if(err){
            console.log('result', err);
            res.status(400).json({success:false, error_message:err})
        }
        else
        if(result){
        console.log('result', result);
        res.status(200).json({success:true, status:200, message:"Product Available", Product_details: result});
        }
    })
}

export = {
    getProduct_color
}