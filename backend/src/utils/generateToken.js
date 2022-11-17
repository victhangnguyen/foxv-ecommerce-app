import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const generateToken = (id) => {
  return jwt.sign({ id: id }, config.general.node.jwtSecret, {
    expiresIn: '1d',
  });
};

export default generateToken;
