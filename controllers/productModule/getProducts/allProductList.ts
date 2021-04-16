import ProductModel from '../../../models/productModel/productModel';
import {Request, Response} from 'express';

const getAllProductList = (req:Request, res:Response) => {
     ProductModel.find()
     .then((result:any) => {

     })
     .catch((err:any) => {
         
     })
}

export = {
    getAllProductList
}