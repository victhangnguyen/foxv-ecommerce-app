//! Library
import Logging from './library/Logging.js';

import cors from 'cors';

//! config
import config from './config/index.js';

import express from 'express';

//! imp mdws
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

//! Router
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

config.db.connectMongoDB();

app.use(cors());
//! Healcheck
app.get('/', (req, res, next) => {
  res.send('API is running...');
});
//! init Mdws
app.use(express.json());
// app.use(express.urlencoded());

//! init Routes
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

//! Not Found - Error Handling
app.use(notFound);
//! Error Handling
app.use(errorHandler);

app.listen(config.db.server.port, () => {
  Logging.log(
    `Server listening in ${config.general.node.environment} on port ${config.db.server.port}! 🚀🚀🚀`
  );
});
