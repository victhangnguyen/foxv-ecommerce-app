//! Datas
// const products = require('../products');
import products from '../products.js';

export const getProducts = (req, res, next) => {
  console.log('__Debugger__ctrls__product__ggetProducts__productId: ', products);

  res.status(200).json(products);
};

export const getProduct = (req, res, next) => {
  const productId = req.params.productId;

  const product = products.find((p) => p._id === productId);

  console.log('__Debugger__ctrls__product__getProduct__productId: ', productId);
  console.log('__Debugger__ctrls__product__getProduct__product: ', product);

  res.status(200).json(product);
};
