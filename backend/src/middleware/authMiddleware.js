import jwt from 'jsonwebtoken';
//! imp models
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  let token;

  console.log(
    `%c __Debugger__req.headers.authorization: ${req.headers.authorization}`,
    'color: blue; font-weight: bold'
  );

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        console.log('Token found');
        token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.decode(token);

        req.user = await User.findById(decoded.id).select('-password'); //! except password

        next();
      } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no Token!');
    }
  } catch (error) {
    next(error);
  }
};

export { protect };
