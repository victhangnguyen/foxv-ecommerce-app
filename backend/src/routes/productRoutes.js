import express from 'express';

//! imp ctrls
import * as productController from '../controllers/productController.js';

const router = express.Router();

//! @desc     Fetch all products
//! @route    GET /api/products
//! @access   Public
router.get('/', productController.getProducts);

//! @desc     Fetch single product by Id
//! @route    GET /api/products/:productId
//! @access   Public
router.get('/:productId', productController.getProduct);

export default router;
