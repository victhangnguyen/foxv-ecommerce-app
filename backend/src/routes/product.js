import express from 'express';

//! imp ctrls
// const productController = require('../controllers/product');
import * as productController from '../controllers/product.js';

const router = express.Router();

router.get('/products', productController.getProducts);
router.get('/products/:productId', productController.getProduct);

export default router;
