//! configs
import configs from './configs/index.js';

import express from 'express';

import productRouter from './routes/product.js';

const app = express();

configs.db.connectMongoDB()

//! Healcheck
app.get('/', (req, res, next) => {
  res.send('API is running...');
});

//! imp Routes
app.use('/api', productRouter);

app.listen(configs.db.server.port, () => {
  console.log(
    `Server listening in ${configs.general.node.environment} on port ${configs.db.server.port}! 🚀🚀🚀`
  );
});
