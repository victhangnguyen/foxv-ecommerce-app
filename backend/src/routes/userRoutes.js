import express from 'express';
//! imp ctrls
import userController from '../controllers/userController.js';
//! imp mdws
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

//! @desc     Register a new User
//! @route    POST /api/users
//! @access   Public
router.post('/', userController.registerUser);

//! @desc     Auth user & get Token
//! @route    GET /api/users/login
//! @access   Public
router.post('/login', userController.authUser);

//! @desc     Get user profile
//! @route    GET /api/users/profile
//! @access   Private

//! @desc     Get user profile
//! @route    PUT /api/users/profile
//! @access   Private

router
  .route('/profile')
  .get(protect, userController.getUserProfile)
  .put(protect, userController.updateUserProfile);

export default router;
