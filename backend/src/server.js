//! Library
import Logging from './library/Logging.js';

//! config
import config from './config/index.js';

import express from 'express';

//! mdws
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

//! Router
import productRouter from './routes/productRoutes.js';

const app = express();

config.db.connectMongoDB();

//! Healcheck
app.get('/', (req, res, next) => {
  res.send('API is running...');
});

//! imp Routes
app.use('/api/products', productRouter);

//! Not Found - Error Handling
app.use(notFound);
//! Error Handling
app.use(errorHandler);

app.listen(config.db.server.port, () => {
  Logging.log(
    `Server listening in ${config.general.node.environment} on port ${config.db.server.port}! 🚀🚀🚀`
  );
});
