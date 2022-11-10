import Product from '../models/productModel.js';

export const getProducts = async (req, res, next) => {
  try {
    // res.status(401);
    // throw new Error('Not Authorized!!!');

    const productDocs = await Product.find({});
    // console.log(
    //   '__Debugger__ctrls__product__getProducts__productDocs: ',
    //   productDocs
    // );

    res.status(200).json(productDocs);
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    // res.status(401);
    // throw new Error('Not Authorized!!!');

    const productId = req.params.productId;

    const productDoc = await Product.findById(productId);

    console.log(
      '__Debugger__ctrls__product__getProducts__productDoc: ',
      productDoc
    );

    if (productDoc) {
      res.status(200).json(productDoc);
    } else {
      res.status(405);
      throw new Error('Product not found!!!');
    }
  } catch (error) {
    console.log('Error: ', error);
    next(error);
  }
};
