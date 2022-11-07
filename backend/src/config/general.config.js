import dotenv from 'dotenv';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

const config = {
  node: {
    environment: NODE_ENV,
  },
};

export default config;