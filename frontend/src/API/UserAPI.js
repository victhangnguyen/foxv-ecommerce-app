//! login
import axiosClient from './axiosClient';

const UserAPI = {
  // getAllData: () => {
  //   const url = '/users';
  //   return axiosClient.get(url);
  // },

  // getDetailData: (id) => {
  //   const url = `/users/${id}`;
  //   return axiosClient.get(url);
  // },

  putUserProfile: (userData, config) => {
    const url = `/users/profile`;
    return axiosClient.put(url, userData, config);
  },

  getUserDetails: (config) => {
    const url = `/users/profile`;
    return axiosClient.get(url, config);
  },

  postSignUp: (userData, config) => {
    const url = `/users`;
    return axiosClient.post(url, userData, config);
  },

  postSignIn: (userData, config) => {
    const url = `/users/login`;
    return axiosClient.post(url, userData, config);
  },
};

export default UserAPI;
