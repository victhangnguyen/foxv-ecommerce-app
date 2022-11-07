//! fake user with bcryptjs hashed password
import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@foxv.com',
    password: bcrypt.hashSync('admin123', 10), //! block I/O operation
    role: 'admin',
  },
  {
    name: 'Vic Thang Nguyen',
    email: 'victhangnguyen@foxv.com',
    password: bcrypt.hashSync('thang123', 10),
    role: 'user',
  },
  {
    name: 'Ho Thi Diem',
    email: 'diem@foxv.com',
    password: bcrypt.hashSync('diem123', 10),
    role: 'user',
  },
];

export default users;
