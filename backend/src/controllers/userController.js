//! imp library
import Logging from '../library/Logging.js';

//! imp utils
import generateToken from '../utils/generateToken.js';
//! imp models
import User from '../models/userModel.js';

//! @desc     Auth user & get Token
//! @route    GET /api/users/login
//! @access   Public
const authUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userDoc = await User.findOne({ email: email });

    if (userDoc && (await userDoc.matchPassword(password))) {
      res.json({
        _id: userDoc._id,
        name: userDoc.name,
        email: userDoc.email,
        password: userDoc.password,
        token: generateToken(userDoc._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    Logging.error(error);
    next(error);
  }
};

//! @desc     Register a new User
//! @route    POST /api/users
//! @access   Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400);
      throw new Error('User already exists');
    }

    const userDoc = await User.create({ name, email, password });

    if (userDoc) {
      res.status(201).json({
        _id: userDoc._id,
        name: userDoc.name,
        email: userDoc.email,
        password: userDoc.password,
        token: generateToken(userDoc._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

//! @desc     Get user profile
//! @route    GET /api/users/profile
//! @access   Private
const getUserProfile = async (req, res, next) => {
  try {
    const userDoc = await User.findById(req.user._id);

    if (userDoc) {
      res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        token: generateToken(userDoc._id),
      });
    }

    res.send('Success');
  } catch (error) {
    next(error);
  }
};

//! @desc     Get user profile
//! @route    PUT /api/users/profile
//! @access   Private
const updateUserProfile = async (req, res, next) => {
  try {
    const userDoc = await User.findById(req.user._id);

    if (userDoc) {
      userDoc.name = req.body.name || userDoc.name;
      userDoc.email = req.body.email || userDoc.email;
      if (req.body.password) {
        userDoc.password = req.body.password;
      }
      const updatedUser = await userDoc.save();

      res.status(201).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        password: updatedUser.password,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error('User not found!');
    }

    res.send('Success');
  } catch (error) {
    next(error);
  }
};

export default { authUser, registerUser, getUserProfile, updateUserProfile };
