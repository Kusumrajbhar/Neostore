import ProductColor from '../../../models/productModel/colorModel';
import {Request, Response} from 'express';

const postProductColor = (req:Request, res:Response) => {
    const colorClass = new ProductColor({
        color_name : req.body.color_name,
        color_code : req.body.color_code,
    })

    colorClass.save()
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
    postProductColor
}