//! library
import Logging from './library/Logging.js';
import dotenv from 'dotenv';

//! datas
import users from './data/users.js';
import products from './data/products.js';

//! models
import Order from './models/orderModel.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';

//! connect Database
import config from './config/index.js';

dotenv.config();

config.db.connectMongoDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    //! Insert Users
    const userDocs = await User.insertMany(users); //! const ~ then(userDocs => {...})

    const adminUserId = userDocs[0]._id;

    //! Insert Products
    //! Init all of products that is createded by adminUser
    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUserId,
      };
    });

    await Product.insertMany(sampleProducts);

    Logging.log('Data Imported!!!');
    process.exit();
  } catch (error) {
    Logging.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    Logging.error('Data Destroyed!!!');
    process.exit();
  } catch (error) {
    Logging.error(error);
    process.exit(1);
  }
};

//! seeder -d
if (process.argv[2] === '-d') {
  destroyData();
} else {
  //! seeder or serder [anything]
  importData();
}
