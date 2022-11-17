import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      uniqe: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

//! Middleware hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    //! if isModified is not modified yet.
    next();
  }
  //! if it has been modified, then this will run and it will hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); //! doMatch
};

const User = mongoose.model('User', userSchema);

export default User;
