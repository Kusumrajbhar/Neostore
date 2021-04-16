import express from 'express';
import bodyParser from 'body-parser';
import postProductImage from '../controllers/productModule/postProduct/postProductImage';
import upload from '../configFiles/multer';
import colorModel from '../controllers/productModule/postProduct/postColor';
import productCategory from '../controllers/productModule/postProduct/productCategory';
import productList from '../controllers/productModule/postProduct/productList';
import productSubImages from '../controllers/productModule/postProduct/productSubImages';
import getCategory from '../controllers/productModule/getProducts/getCategory';
import getProductColor from '../controllers/productModule/getProducts/getProductColor';
import getProductList from '../controllers/productModule/getProducts/getProductList';
import getSubImages from '../controllers/productModule/getProducts/getSubImages';
import getAllColor from '../controllers/productModule/getProducts/getAllColor';
import allCategory from '../controllers/productModule/getProducts/allCategory';
import allProductList from '../controllers/productModule/getProducts/allProductList';
import allSubImages from '../controllers/productModule/getProducts/allSubImages';

const router = express.Router();
const app = express();
app.use(bodyParser.json());

//route for post
router.post('/postImages', upload.single('product_image'), postProductImage.postProductImages );
router.post('/postColor', colorModel.postProductColor);
router.post('/postCategory', upload.single('product_image'), productCategory.postCategory);
router.post('/postProduct', upload.single('product_image'), productList.postProduct);
router.post('/postSubImages', upload.array('subImages'), productSubImages.postSubImages);

//route for get all 
router.get('/allCategory', allCategory.getAllCategory);
router.get('/allColor', getAllColor.allColor);
router.get('/allProduct', allProductList.getAllProductList);
router.get('/allSubImages', allSubImages.getAllSubImages);

//route for get
router.get('/getCategory', getCategory.getProductCategory);
router.get('/getColor', getProductColor.getColorOfProduct);
router.get('/getProduct', getProductList.getProduct_color);
router.get('/getSubImages', getSubImages.getProductSubImages);

export default router;