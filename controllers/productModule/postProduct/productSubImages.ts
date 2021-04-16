import SubImageModel from '../../../models/productModel/subImages';
import {Request, Response} from 'express';

const postSubImages = (req:Request, res:Response) => {
   const subImages_list:any = [];
   if(!req.files){
    console.log('Please select the files');
    res.status(400).json({success:false, status:400, message:"Please select the files"}); 
   }else {
       let files:any = req.files;
       for(let i:number = 0; i<files.length; i++){
           if(subImages_list.indexOf(files[i].filename) == -1){
               subImages_list.push(files[i].filename)
           }
       }
   }

    const subImages = new SubImageModel({
        subImages:subImages_list,
    })

    subImages.save()
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
    postSubImages
}