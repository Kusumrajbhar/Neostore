import express from 'express';
import bodyParser from 'body-parser';
import postProductImage from '../controllers/productModule/postProduct/postProductImage';
import upload from '../configFiles/multer';
import colorModel from '../controllers/productModule/postProduct/postColor';
import productCategory from '../controllers/productModule/postProduct/productCategory';
import productList from '../controllers/productModule/postProduct/productList';
import productSubImages from '../controllers/productModule/postProduct/productSubImages';

const router = express.Router();
const app = express();
app.use(bodyParser.json());

router.post('/postImages', upload.single('product_image'), postProductImage.postProductImages );
router.post('/postColor', colorModel.postProductColor);
router.post('/postCategory', productCategory.postCategory);
router.post('/postProduct', upload.single('product_image'), productList.postProduct);
router.post('/postSubImages', upload.array('subImages'), productSubImages.postSubImages);

export default router;