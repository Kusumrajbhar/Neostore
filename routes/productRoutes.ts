import express from 'express';
import bodyParser from 'body-parser';
import postProductImage from '../controllers/productModule/postProduct/postProductImage';
import upload from '../configFiles/multer';
import colorModel from '../controllers/productModule/postProduct/postColor';

const router = express.Router();
const app = express();
app.use(bodyParser.json());

router.post('/postImages', upload.single('product_image'), postProductImage.postProductImages );
router.post('/postColor', colorModel.postProductColor);

export default router;